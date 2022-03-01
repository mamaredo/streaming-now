package router

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func requestHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := "http://localhost:3000"
		w.Header().Set("Access-Control-Allow-Origin", origin)
		next.ServeHTTP(w, r)
	})
}

func Setup() *mux.Router {
	fmt.Println("from router")
	r := mux.NewRouter()
	r.Use(requestHeaderMiddleware)
	return r
}
