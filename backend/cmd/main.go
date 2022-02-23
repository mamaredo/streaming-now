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

	for _, item := range tests {
		json.NewEncoder(w).Encode(item)
		return
	}
}

func requestHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := "http://localhost:3000"
		w.Header().Set("Access-Control-Allow-Origin", origin)
		next.ServeHTTP(w, r)
	})
}

func main() {
	// ルーターのイニシャライズ
	r := mux.NewRouter()
	r.Use(requestHeaderMiddleware)
	tests = append(tests, Test{ID: "1", Title: "Test API"})

	// ルート(エンドポイント)
	r.HandleFunc("/api/tests", getTests).Methods("GET")
	r.HandleFunc("/api/test", getTest).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", r))
}
