package twitch

import (
	"encoding/json"
	"log"
)

type followedStreamerResponseModel struct {
	Game_name     string
	Id            string // stream id
	Started_at    string
	Thumbnail_url string
	Title         string
	Type          string
	User_id       string
	User_name     string
	Viewer_count  int
}

type FollowedStreamerResponse struct {
	Data []followedStreamerResponseModel
}

func GetFollowActiveStreamer(token *VerifiedToken) (*FollowedStreamerResponse, error) {
	requestArg := NewRequestArg{
		Method: "GET",
		Url:    "https://api.twitch.tv/helix/streams/followed?user_id=" + token.User_id,
		Body:   nil,
	}

	b, err := RequestTwitchAPI(token, requestArg)
	if err != nil {
		log.Println("GetFollowActiveStreamer Request Error")
		return nil, err
	}

	var r FollowedStreamerResponse
	if err := json.Unmarshal(b, &r); err != nil {
		log.Println("json unmarshal Error")
		return nil, err
	}

	return &r, nil
}
