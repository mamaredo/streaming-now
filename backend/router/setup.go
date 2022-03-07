package router

import (
	// "log"
	"net/http"

	"github.com/gorilla/mux"
)

func requestHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := "https://localhost:3000"
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Add("Access-Control-Request-Method", "POST, OPTIONS")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		next.ServeHTTP(w, r)
	})
}

func Setup() *mux.Router {
	r := mux.NewRouter()
	r.Use(requestHeaderMiddleware)
	return r
}
