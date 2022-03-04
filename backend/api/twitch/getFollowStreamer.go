package twitch

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type ResponseModel struct {
	Is_auth bool `json:"is_auth"`
}

func GetFollowStreamer(w http.ResponseWriter, r *http.Request) {
	token := VerifyAccessToken(w, r)

	// _____________________________________________________________________________
	//
	/* 関数化できそう */

	client := http.Client{}

	// 配信中の配信者
	req, err := http.NewRequest("GET", "https://api.twitch.tv/helix/streams/followed?user_id="+token.User_id, nil)

	// フォローしているユーザー
	// req, err := http.NewRequest("GET", "https://api.twitch.tv/helix/users/follows?from_id="+token.User_id, nil)
	if err != nil {
		log.Println("create request Error")
	}

	req.Header = http.Header{
		"Authorization": []string{"Bearer " + token.Access_token},
		"Client-Id":     []string{token.Client_id},
	}

	res, err := client.Do(req)
	if err != nil {
		log.Println(err)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Println(err)
	}
	// _____________________________________________________________________________
	//

	var v interface{}
	json.Unmarshal(body, &v)
	fmt.Println(v)

	json.NewEncoder(w).Encode(ResponseModel{
		Is_auth: true,
	})
}
