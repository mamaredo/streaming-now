package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mamaredo/streaming-now/api/twitch"
	"github.com/mamaredo/streaming-now/pkg/env"
	"github.com/mamaredo/streaming-now/router"
)

type Test struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

var tests []Test

func getTests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tests)
}

func getTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	for _, item := range tests {
		json.NewEncoder(w).Encode(item)
		return
	}
}

func main() {
	r := router.Setup()
	tests = append(tests, Test{ID: "1", Title: "Test API"})

	tru := env.Get("TWITCH_REDIRECT_URL")
	// ルート(エンドポイント)
	r.HandleFunc(tru, twitch.Auth).Methods("GET")
	r.HandleFunc("/api/tests", getTests).Methods("GET")
	r.HandleFunc("/api/test", getTest).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", r))
}
