package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/polds/imgbase64"
)

//ImageData struct
type ImageData struct {
	ID       string `json:"username"`
	Filename string `json:"imageUrl"`
	Caption  string `json:"caption"`
	Category string `json:"category"`
}

func getImagesForCategory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("File Get Endpoint Hit")

	fmt.Println(r.FormValue("email"))

	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}

	results, err := db.Query("SELECT filename,caption,category from imageloc where user=? and category=?", r.FormValue("email"), r.FormValue("category"))
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

func setupRoutes() {
	http.HandleFunc("/getCategoryImages", getImagesForCategory)
	http.ListenAndServe(":8091", nil)
}

func main() {
	fmt.Println("Hello World")
	setupRoutes()
}
