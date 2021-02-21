package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

func getSize(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("getSize endpoint hit")
	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	query, err := db.Prepare("select count(*) from imageloc where user=?")
	if err != nil {
		panic(err.Error())
	}
	var size int
	query.QueryRow(r.FormValue("email")).Scan(&size)
	fmt.Println("size", size)
	fmt.Fprintf(w, strconv.Itoa(size))
}
