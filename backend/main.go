package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/polds/imgbase64"
	_ "github.com/polds/imgbase64"
)

//ImageData struct
type ImageData struct {
	ID       string `json:"username"`
	Filename string `json:"imageUrl"`
	Caption  string `json:"caption"`
	Category string `json:"category"`
}

func getFiles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("File Get Endpoint Hit")

	fmt.Println(r.FormValue("email"))

	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}

	results, err := db.Query("SELECT filename,caption,category from imageloc where user=?", r.FormValue("email"))
	if err != nil {
		panic(err.Error())
	}

	var posts []ImageData
	for results.Next() {
		var post ImageData
		err = results.Scan(&post.Filename, &post.Caption, &post.Category)
		post.ID = "abc@gmail.com"
		if err != nil {
			panic(err.Error())
		}
		posts = append(posts, post)
	}

	fmt.Println(posts)
	response, err := json.Marshal(posts)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, string(response))
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("File Upload Endpoint Hit")

	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 10 MB files.
	r.ParseMultipartForm(10 << 20)
	// FormFile returns the first file for the given key `myFile`
	// it also returns the FileHeader so we can get the Filename,
	// the Header and the size of the file
	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempFile, err := ioutil.TempFile("../frontend/public/assets", "upload-*.png")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	// read all of the contents of our uploaded file into a
	// byte array
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	// write this byte array to our temporary file
	tempFile.Write(fileBytes)
	// return that we have successfully uploaded our file!
	fmt.Printf("Successfully Uploaded File\n")

	fmt.Printf("Connecting to DB")

	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")

	if err != nil {
		panic(err.Error())
	}

	insert, err := db.Prepare("INSERT into imageloc (filename,user,caption,category) VALUES (?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	filename := tempFile.Name()[26:]

	insert.Exec(filename, r.FormValue("email"), r.FormValue("caption"), r.FormValue("category"))
	fmt.Printf("Successfully inserted into database")
	defer db.Close()

	img, err := imgbase64.FromLocal(filename)
	fmt.Println(img)

	var data ImageData
	data.ID = r.FormValue("email")
	data.Caption = r.FormValue("caption")
	data.Filename = filename
	data.Category = r.FormValue("category")

	response, err := json.Marshal(data)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, string(response))
	fmt.Println(string(response))
}

func setupRoutes() {
	http.HandleFunc("/upload", uploadFile)
	http.HandleFunc("/allImages", getFiles)
	http.ListenAndServe(":8080", nil)
}

func main() {
	fmt.Println("Hello World")
	setupRoutes()
}
