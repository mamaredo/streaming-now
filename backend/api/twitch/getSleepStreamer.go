package twitch

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strconv"
)

type sleepStreamerResponseModel struct {
	User_name   string `json:"user_name"`
	Profile_img string `json:"profile_img"`
	Stream_link string `json:"stream_link"`
}

type sleepStreamerResponse struct {
	Data []sleepStreamerResponseModel `json:"data"`
}

func GetSleepStremaer(w http.ResponseWriter, r *http.Request) {
	log.Println("[GET] /api/twitch/sleep-streamer")
	token := VerifyAccessToken(w, r)

	au, err := GetFollowActiveStreamer(token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	fu, err := GetFollowsUsers(token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	aUids := []int{}
	for _, v := range au.Data {
		intValue, _ := strconv.Atoi(v.User_id)
		aUids = append(aUids, intValue)
	}

	fUids := []int{}
	for _, v := range fu.Data {
		intValue, _ := strconv.Atoi(v.To_id)
		fUids = append(fUids, intValue)
	}

	sleepUids := []string{}
	if len(aUids) != len(fUids) {
		sUids := filterUser(aUids, fUids)
		for i := 0; i < len(sUids); i++ {
			strValue := strconv.Itoa(sUids[i])
			sleepUids = append(sleepUids, strValue)
		}
	} else {
		for i := 0; i < len(aUids); i++ {
			strValue := strconv.Itoa(aUids[i])
			sleepUids = append(sleepUids, strValue)
		}
	}

	u, err := GetUser(token, sleepUids)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("400 Bad Request"))
		return
	}

	res := sleepStreamerResponse{
		Data: nil,
	}

	for i := 0; i < len(u.Data); i++ {
		res.Data = append(res.Data, sleepStreamerResponseModel{
			User_name:   u.Data[i].Display_name,
			Profile_img: u.Data[i].Profile_image_url,
			Stream_link: "https://www.twitch.tv/" + u.Data[i].Login,
		})
	}

	json.NewEncoder(w).Encode(res)
}

func filterUser(activeAll []int, followAll []int) []int {
	results := []int{}
	sort.Sort(sort.Reverse(sort.IntSlice(activeAll))) // 降順
	sort.Ints(followAll)                              // 昇順

	for 0 < len(activeAll) {
		for j := 0; j < len(followAll); j++ {
			if activeAll[0] == followAll[j] {
				results = append(results, followAll[j+1:]...)
				followAll = followAll[:j]
				break
			}
		}
		activeAll = activeAll[1:]
	}
	results = append(results, followAll[:]...)
	log.Println("[GET] /api/twitch/sleep-streamer OK :)")
	return results
}
