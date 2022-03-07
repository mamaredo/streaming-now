export type Endpoint = {
  activeStreamer: '/api/twitch/active-streamer'
}

export type ActiveStreamer = {
  description: string
  user_name: string
  profile_img: string
  stream_title: string
  started_at: string
  game_name: string
  thumbnail_url: string
  stream_link: string
  viewer_count: number
}
