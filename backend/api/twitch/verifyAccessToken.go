package twitch

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type VerifiedToken struct {
	Client_id    string
	Login        string
	Scopes       []string
	User_id      string
	Expires_in   int
	Access_token string
}

var verifiedToken VerifiedToken

func VerifyAccessToken(w http.ResponseWriter, r *http.Request) *VerifiedToken {
	accessToken, err := r.Cookie("twitch_access_token")
	if err != nil {
		log.Println("[Middleware] AccessToken get cookie Error")
		return nil
	}
	client := http.Client{}
	req, err := http.NewRequest("GET", "https://id.twitch.tv/oauth2/validate", nil)
	if err != nil {
		log.Println("create request Error")
		return nil
	}

	bearer := "Bearer " + accessToken.Value
	req.Header = http.Header{
		"Authorization": []string{bearer},
	}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err)
		return nil
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Println(err)
		return nil
	}

	json.Unmarshal(body, &verifiedToken)

	verifiedToken.Access_token = accessToken.Value
	fmt.Println(verifiedToken)
	return &verifiedToken
}
