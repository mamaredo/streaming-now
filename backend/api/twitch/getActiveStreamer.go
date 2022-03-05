package twitch

import (
	"encoding/json"
	"net/http"
)

type responseModel struct {
	Description   string `json:"description"`
	User_name     string `json:"user_name"`
	Profile_img   string `json:"profile_img"`
	Stream_title  string `json:"stream_title"`
	Started_at    string `json:"started_at"`
	Game_name     string `json:"game_name"`
	Thumbnail_url string `json:"thumbnail_url"`
	Stream_link   string `json:"stream_link"`
	Viewer_count  int    `json:"viewer_count"`
}

type response struct {
	Data []responseModel `json:"data"`
}

func GetActiveStreamer(w http.ResponseWriter, r *http.Request) {
	token := VerifyAccessToken(w, r)

	f, err := GetFollowActiveStreamer(token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	uids := []string{}
	for _, v := range f.Data {
		uids = append(uids, v.User_id)
	}

	u, err := GetUser(token, uids)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	res := response{
		Data: nil,
	}

	for i := 0; i < len(f.Data); i++ {
		res.Data = append(res.Data, responseModel{
			Description:   u.Data[i].Description,
			User_name:     u.Data[i].Display_name,
			Profile_img:   u.Data[i].Profile_image_url,
			Stream_title:  f.Data[i].Title,
			Started_at:    f.Data[i].Started_at,
			Game_name:     f.Data[i].Game_name,
			Thumbnail_url: f.Data[i].Thumbnail_url,
			Stream_link:   "https://www.twitch.tv/" + u.Data[i].Display_name,
			Viewer_count:  f.Data[i].Viewer_count,
		})
	}

	json.NewEncoder(w).Encode(res)
}
