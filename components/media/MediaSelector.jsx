'use client'
const { default: ReactPlayer } = require('react-player')

export function MediaSelector({ url, onError }) {
  if (!url) return null
  const isYoutube = url.match(/youtube.com|youtu.be/)

  const isSound = url.match(/.(mp3|wav|ogg|m4a|wma|aac|flac|alac|opus)$/i)

  if (isYoutube) return <ReactPlayer url={url} width={'100%'} height={'auto'} />

  if (isSound)
    return <audio src={url} controls width={'100%'} height={'auto'} />

  return <img src={url} alt="media" className="h-auto w-56" onError={onError} />
}
