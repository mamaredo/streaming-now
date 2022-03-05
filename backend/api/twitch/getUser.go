package twitch

import (
	"encoding/json"
	"fmt"
	"log"
)

type Uids []string

type userResponseModel struct {
	Description       string
	Id                string
	Display_name      string
	Profile_image_url string
}

type UserResponse struct {
	Data []userResponseModel
}

func GetUser(token *VerifiedToken, uids Uids) (*UserResponse, error) {
	fmt.Println(uids)
	var queryString = uids[0]
	const id = "id="
	fmt.Println(queryString)
	if len(uids) >= 2 {
		u := uids[1:]
		fmt.Println(u)
		for i := 0; i < len(u); i++ {
			queryString += "&" + id + u[i]
		}
	}
	fmt.Println(queryString)
	requestArg := NewRequestArg{
		Method: "GET",
		Url:    "https://api.twitch.tv/helix/users?id=" + queryString,
		Body:   nil,
	}

	b, err := RequestTwitchAPI(token, requestArg)
	if err != nil {
		log.Println("GetFollowActiveStreamer Request Error")
		return nil, err
	}

	var r UserResponse
	if err := json.Unmarshal(b, &r); err != nil {
		return nil, err
	}
	fmt.Println("r", len(r.Data))
	return &r, nil
}
