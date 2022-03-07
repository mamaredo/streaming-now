package youtube

import (
	"log"
	"net/http"
)

func Auth(w http.ResponseWriter, r *http.Request) {
	log.Println("[POST] /api/youtube/auth")
}
