package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
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
	params := mux.Vars(r)

	// Loop through books and find with id
	for _, item := range tests {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Test{})
}

func main() {
	// ルーターのイニシャライズ
	r := mux.NewRouter()

	tests = append(tests, Test{ID: "1", Title: "Test API"})

	// ルート(エンドポイント)
	r.HandleFunc("/api/tests", getTests).Methods("GET")
	r.HandleFunc("/api/test", getTest).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", r))
}
