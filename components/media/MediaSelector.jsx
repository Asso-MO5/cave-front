'use client'
const { default: ReactPlayer } = require('react-player')

export function MediaSelector({ url, onError }) {
  if (!url) return null
  const isYoutube = url.match(/youtube.com|youtu.be/)

  if (isYoutube) return <ReactPlayer url={url} width={'100%'} height={'auto'} />

  return <img src={url} alt="media" className="h-auto w-56" onError={onError} />
}
