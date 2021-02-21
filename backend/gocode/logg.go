package main

import (
	"fmt"
	"log"
)

var (
	WarningLogger *log.Logger
	InfoLogger    *log.Logger
	ErrorLogger   *log.Logger
)

func logger() {
	fmt.Println("Main")
	InfoLogger.Println("Starting the application...")
}
