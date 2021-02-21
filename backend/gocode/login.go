package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

type result struct {
	Message string `json:"message"`
	Token   string `json:"Token"`
}

var mySigningKey = []byte("mysecretkey")

func GenerateJWT(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["user"] = username
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		ErrorLogger.Println("Error while generating token", err.Error())
		fmt.Errorf("Something went Wrong: %s", err.Error())
		return "", err
	}

	return tokenString, err

}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("Login Endpoint hit")

	db, err := sql.Open("mysql", "root:password@tcp(172.17.0.2)/ImageGallery")
	if err != nil {
		panic(err.Error())
		ErrorLogger.Println("Error while connecting to database", err.Error())
	}
	defer db.Close()

	userExist, err := db.Query("select count(*) from users where email=? and password=?", r.FormValue("email"), r.FormValue("password"))
	if err != nil {
		ErrorLogger.Println("Error while executing the query while logging in", err.Error())
		fmt.Println("error is ", err.Error())
	}

	var count int

	for userExist.Next() {
		if err := userExist.Scan(&count); err != nil {
			log.Fatal(err)
		}
	}

	var data result
	if count == 0 {
		u, err := db.Query("select count(*) from imageloc where user=?", r.FormValue("email"))
		if err != nil {
			fmt.Println("error is ", err.Error())
		}
		var c int

		for u.Next() {
			if err := u.Scan(&c); err != nil {
				log.Fatal(err)
			}
		}
		if c == 0 {
			data.Message = "User did not exist"
			data.Token = ""
		} else {
			data.Message = "Password did not match"
			data.Token = ""
		}
	} else {
		data.Message = "Success"
		validToken, err := GenerateJWT(r.FormValue("email"))
		if err != nil {
			fmt.Fprintf(w, err.Error())
		}
		data.Token = validToken
	}
	response, err := json.Marshal(data)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, string(response))
}
