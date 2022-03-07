package youtube

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/mamaredo/streaming-now/pkg/env"
)

type response struct {
	Is_auth bool `json:"is_auth"`
}

func Auth(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		log.Println("[OPTIONS] /api/youtube/auth")
		w.WriteHeader(http.StatusOK)
		return
	}
	log.Println("[POST] /api/youtube/auth")

	token, err := requestToken(r)
	if err != nil {
		log.Println(err)
		json.NewEncoder(w).Encode(response{
			Is_auth: false,
		})
		return
	}

	fmt.Printf("%+v", *token)
	json.NewEncoder(w).Encode(response{
		Is_auth: false,
	})
}

type authorizationBody struct {
	Code  string
	Scope string
}

type tokenModel struct {
	Access_token  string
	Token_type    string
	Expires_in    int
	Refresh_token string
}

type tokenResponse struct {
	Data []tokenModel
}

func requestToken(r *http.Request) (*interface{}, error) {
	b, err := io.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
	}
	defer r.Body.Close()

	var auth authorizationBody
	if err = json.Unmarshal(b, &auth); err != nil {
		log.Println(err)
	}
	v := url.Values{}
	v.Add("code", auth.Code)
	v.Add("client_id", env.Get("YOUTUBE_CLIENT_ID"))
	v.Add("client_secret", env.Get("YOUTUBE_CLIENT_SECRET"))
	v.Add("redirect_uri", env.Get("YOUTUBE_CALLBACK_URL"))
	v.Add("grant_type", "authorization_code")
	// req, err := http.NewRequest("POST", "https://accounts.google.com/o/oauth2/token?"+url.PathEscape(v.Encode()), nil)

	// ここのリクエストをhttpsを使って通信する必要がありそう。
	req, err := http.NewRequest("POST", "https://accounts.google.com/o/oauth2/token", strings.NewReader(url.PathEscape(v.Encode())))
	if err != nil {
		return nil, err
	}

	req.Header = http.Header{
		"Host":         []string{"accounts.google.com"},
		"Content-Type": []string{"application/x-www-form-urlencoded"},
	}

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	var token interface{}
	json.Unmarshal(body, &token)
	fmt.Println(token)
	return &token, nil
}
