package twitch

import (
	"fmt"
	"log"
	"time"

	"github.com/lestrrat-go/jwx/jwt"
	"github.com/mamaredo/streaming-now/pkg/env"
)

// type JwtHeader struct {
// 	Alg string `json:"alg"`
// 	Typ string `json:"typ"`
// 	Kid string `json:"kid"`
// }

// type JwtPayload struct {
// 	Iss string `json:"iss"`
// 	Sub string `json:"sub"`
// 	Aud string `json:"aud"`
// 	Exp int    `json:"exp"`
// 	Iat int    `json:"iat"`
// }

// type JWKey struct {
// 	Alg string `json:"alg"`
// 	Kid string `json:"kid"`
// 	Kty string `json:"kty"`
// 	Use string `json:"use"`
// 	N   string `json:"n"`
// 	E   string `json:"e"`
// }

// type JWKeys struct {
// 	Keys []JWKey `json:"keys"`
// }

// func GetJWKToken() *JWKey {
// 	// res, err := http.Get("https://id.twitch.tv/oauth2/keys")
// 	res, err := os.ReadFile("twitch-jwk.json")
// 	if err != nil {
// 		fmt.Println("os.ReadFile Error: ", err)
// 	}

// 	var jwKeys JWKeys
// 	// if err = json.Unmarshal(body, &jwKeys); err != nil {
// 	if err = json.Unmarshal(res, &jwKeys); err != nil {
// 		fmt.Println("unmarshal Error: ", err)
// 	}

// 	jwk := jwKeys.Keys[0]

// 	return &jwk
// }

func VerifyIdToken(jwtToken *string) (bool, error) {
	var id_token = []byte(*jwtToken)
	token, err := jwt.Parse(id_token)
	if err != nil {
		fmt.Println("parsed error", err)
		return false, err
	}

	if token.Issuer() != env.Get("TWITCH_ISSUER") {
		log.Println("twitchAuthError: not match issuer")
		return false, err
	}

	if token.Audience()[0] != env.Get("TWITCH_CLIENT_ID") {
		log.Println("twitchAuthError: not match audience")
		return false, err
	}

	var isAfter bool
	if time.Now().After(token.Expiration()) {
		isAfter = true
	}
	log.Println("[Twitch] jwk payload ok :)")
	return isAfter, nil
}
