package twitch

import (
	"encoding/json"
	"log"
)

type followsUsersResponseModel struct {
	To_id   string
	To_name string
}

type FolowsUsersResponse struct {
	Data  []followsUsersResponseModel
	Total int
}

func GetFollowsUsers(token *VerifiedToken) (*FolowsUsersResponse, error) {
	requestArg := NewRequestArg{
		Method: "GET",
		Url:    "https://api.twitch.tv/helix/users/follows?first=100&from_id=" + token.User_id,
		Body:   nil,
	}

	b, err := RequestTwitchAPI(token, requestArg)
	if err != nil {
		log.Println("GetFollowsUsers Request Error")
		return nil, err
	}

	var r FolowsUsersResponse
	if err := json.Unmarshal(b, &r); err != nil {
		return nil, err
	}

	return &r, nil
}
