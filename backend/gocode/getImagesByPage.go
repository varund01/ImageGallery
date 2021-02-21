package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

//ImageData struct
type ImageData struct {
	ID       string `json:"username"`
	Filename string `json:"imageUrl"`
	Caption  string `json:"caption"`
	Category string `json:"category"`
}

func getImagesByPage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("Get Images By Page Endpoint hit")
	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	fmt.Println(r.FormValue("limit"))
	fmt.Println(r.FormValue("offset"))
	results, err := db.Query("SELECT filename,caption,category from imageloc where user=? order by id DESC LIMIT ? OFFSET ?", r.FormValue("email"), r.FormValue("limit"), r.FormValue("offset"))
	if err != nil {
		panic(err.Error())
	}
	var posts []ImageData
	for results.Next() {
		var post ImageData
		err = results.Scan(&post.Filename, &post.Caption, &post.Category)
		post.ID = r.FormValue("email")
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
