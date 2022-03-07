export type Endpoint = {
  activeStreamer: '/api/twitch/active-streamer'
  sleepStreamer: '/api/twitch/sleep-streamer'
}

export type SleepStreamer = {
  user_name: string
  profile_img: string
  stream_link: string
}
