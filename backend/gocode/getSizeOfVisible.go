package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

func getSizeOfVisible(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("getSizeOfVisibileImages endpoint hit")
	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	query, err := db.Prepare("select count(*) from imageloc where CanOthersSee IN (1)")
	if err != nil {
		panic(err.Error())
	}
	var size int
	query.QueryRow(r.FormValue("email")).Scan(&size)
	fmt.Println("size", size)
	fmt.Fprintf(w, strconv.Itoa(size))
}
