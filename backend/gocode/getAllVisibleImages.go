package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func getAllVisibleImages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	InfoLogger.Println("Get All Visible Images By All users Endpoint hit")

	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	fmt.Println(r.FormValue("limit"))
	fmt.Println(r.FormValue("offset"))
	results, err := db.Query("SELECT user,filename,caption,category from imageloc where CanOthersSee IN (1) order by id DESC LIMIT ? OFFSET ?", r.FormValue("limit"), r.FormValue("offset"))
	if err != nil {
		panic(err.Error())
	}
	var posts []ImageData
	for results.Next() {
		var post ImageData
		err = results.Scan(&post.ID, &post.Filename, &post.Caption, &post.Category)

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
