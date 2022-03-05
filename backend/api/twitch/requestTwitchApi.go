package twitch

import (
	"io"
	"log"
	"net/http"
)

type NewRequestArg struct {
	Method string
	Url    string
	Body   io.Reader
}

func RequestTwitchAPI(token *VerifiedToken, r NewRequestArg) ([]byte, error) {
	client := http.Client{}

	req, err := http.NewRequest(r.Method, r.Url, r.Body)
	if err != nil {
		log.Println("create request Error")
		return nil, err
	}

	req.Header = http.Header{
		"Authorization": []string{"Bearer " + token.Access_token},
		"Client-Id":     []string{token.Client_id},
	}

	res, err := client.Do(req)
	if err != nil {
		log.Println("client.Do Error", err)
		return nil, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Println("io.ReadAll Error", err)
		return nil, err
	}

	return body, nil
}
