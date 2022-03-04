package twitch

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/mamaredo/streaming-now/pkg/env"
)

// const (
// 	oauthSessionName = "oauth-oidc-session"
// )

// var (
// 	cookieSecret = []byte("Please use a more sensible secret than this one")
// 	cookieStore  = sessions.NewCookieStore(cookieSecret)
// )

type Response struct {
	Is_auth bool `json:"is_auth"`
}

func Auth(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	q := r.URL.Query()
	token, err := requestToken(q, r)
	if err != nil {
		log.Println(err)
		json.NewEncoder(w).Encode(Response{
			Is_auth: true,
		})
		return
	}

	id_token := token["id_token"].(string)
	if err := VerifySignature(&id_token); err != nil {
		log.Println("token signature Error")
		json.NewEncoder(w).Encode(Response{
			Is_auth: true,
		})
		return
	}

	verifyIdToken, err := VerifyIdToken(&id_token)
	if err != nil {
		log.Println("token verify Error")
		json.NewEncoder(w).Encode(Response{
			Is_auth: true,
		})
		return
	}

	if time.Now().After(verifyIdToken.Expiration()) {
		log.Println("[Twitch] IDToken invalid exp :(")
		_, err := requestToken(q, r)
		if err != nil {
			log.Println(err)
		}
	}

	accessTokenCookie := &http.Cookie{
		Name:   "twitch_access_token",
		Value:  token["access_token"].(string),
		MaxAge: int(token["expires_in"].(float64)),
		Path:   "/",
	}
	idTokenCookie := &http.Cookie{
		Name:    "twitch_id_token",
		Value:   token["id_token"].(string),
		Expires: verifyIdToken.Expiration(),
		Path:    "/",
	}
	http.SetCookie(w, accessTokenCookie)
	http.SetCookie(w, idTokenCookie)

	json.NewEncoder(w).Encode(Response{
		Is_auth: true,
	})
}

type AuthorizationBody struct {
	Code  string
	Scope string
}

func requestToken(query url.Values, r *http.Request) (map[string]interface{}, error) {
	b, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
	defer r.Body.Close()

	var auth AuthorizationBody
	if err = json.Unmarshal(b, &auth); err != nil {
		fmt.Println(err)
	}

	v := url.Values{}
	v.Add("client_id", env.Get("TWITCH_CLIENT_ID"))
	v.Add("client_secret", env.Get("TWITCH_CLIENT_SECRET"))
	v.Add("code", auth.Code)
	v.Add("grant_type", "authorization_code")
	v.Add("redirect_uri", env.Get("TWITCH_CALLBACK_URL"))

	req, err := http.NewRequest("POST", "https://id.twitch.tv/oauth2/token", strings.NewReader(v.Encode()))
	if err != nil {
		return nil, err
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
	var token map[string]interface{}
	json.Unmarshal(body, &token)

	// fmt.Printf("token response :%s\n", string(body))

	return token, nil
}
