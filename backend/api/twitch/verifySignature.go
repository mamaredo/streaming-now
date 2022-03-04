package twitch

import (
	"context"
	"log"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

func VerifySignature(jwtToken *string) error {
	var id_token = []byte(*jwtToken)

	set, err := jwk.Fetch(context.Background(), "https://id.twitch.tv/oauth2/keys")
	if err != nil {
		log.Printf("failed to parse JWK: %s", err)
		return err
	}

	// token, err := jwt.Parse(id_token, jwt.WithKeySet(set))
	if _, err := jwt.Parse(id_token, jwt.WithKeySet(set)); err != nil {
		log.Printf("failed to parse payload: %s", err)
		return err
	}

	log.Println("[Twitch] jwk verify ok :)")

	return nil
}
