package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
)

func isAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Header["Token"] != nil {
			token, err := jwt.Parse(r.Header["Token"][0], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("There was an error")
				}
				return mySigningKey, nil
			})
			if err != nil {
				fmt.Fprintf(w, err.Error())
			}

			if token.Valid {
				endpoint(w, r)
			}

		} else {
			//ErrorLogger.Println("Not Authorized")
			fmt.Fprintf(w, "Not Authorized")
		}

	})
}

func handleRequests() {
	http.Handle("/getImagesByPage", isAuthorized(getImagesByPage))
	http.Handle("/getSize", isAuthorized(getSize))
	http.Handle("/getSizeOfVisible", isAuthorized(getSizeOfVisible))
	http.Handle("/getAllVisibleImages", isAuthorized(getAllVisibleImages))
	http.HandleFunc("/login", login)
	http.Handle("/home", isAuthorized(homePage))
	http.ListenAndServe(":7800", nil)
}

func init() {
	file, err := os.OpenFile("error.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}
	InfoLogger = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	WarningLogger = log.New(file, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLogger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func main() {
	fmt.Println("Main")
	logger()
	handleRequests()
}
