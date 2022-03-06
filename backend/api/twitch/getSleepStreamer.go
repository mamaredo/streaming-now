package twitch

import (
	"fmt"
	"net/http"
)

// type sleepStreamerResponseModel struct {
// 	User_name   string `json:"user_name"`
// 	Profile_img string `json:"profile_img"`
// 	Stream_link string `json:"stream_link"`
// }

// type sleepStreamerResponse struct {
// 	Data []sleepStreamerResponseModel `json:"data"`
// }

func GetSleepStremaer(w http.ResponseWriter, r *http.Request) {
	token := VerifyAccessToken(w, r)

	// f, err := GetFollowActiveStreamer(token)
	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	w.Write([]byte("400 Bad Request"))
	// 	return
	// }

	// uids := []string{}
	// for _, v := range f.Data {
	// 	uids = append(uids, v.User_id)
	// }

	fu, err := GetFollowsUsers(token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	// 正確なresponseを取得したところまで確認
	fmt.Printf("%+v", *fu)
	fmt.Printf("%+v", len(fu.Data))

}
