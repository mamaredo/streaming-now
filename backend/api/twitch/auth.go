package twitch

import (
	"fmt"
	"net/http"
)

func Auth(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Println("Error")
	}

	for k, v := range r.Form {
		fmt.Printf("%v : %v\n", k, v)
	}
	http.Redirect(w, r, "http://localhost:3000", http.StatusFound)
}
