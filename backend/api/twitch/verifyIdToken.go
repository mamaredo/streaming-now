package twitch

import (
	"fmt"
	"log"

	"github.com/lestrrat-go/jwx/jwt"
	"github.com/mamaredo/streaming-now/pkg/env"
)

func VerifyIdToken(jwtToken *string) (jwt.Token, error) {
	var id_token = []byte(*jwtToken)
	token, err := jwt.Parse(id_token)
	if err != nil {
		fmt.Println("parsed error", err)
		return nil, err
	}

	if token.Issuer() != env.Get("TWITCH_ISSUER") {
		log.Println("twitchAuthError: not match issuer")
		return nil, err
	}

	if token.Audience()[0] != env.Get("TWITCH_CLIENT_ID") {
		log.Println("twitchAuthError: not match audience")
		return nil, err
	}

	log.Println("[Twitch] jwk payload ok :)")
	return token, nil
}
