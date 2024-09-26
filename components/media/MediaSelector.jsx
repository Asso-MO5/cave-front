'use client'
const { default: ReactPlayer } = require('react-player')

export function MediaSelector({ url, onError }) {
  const isYoutube = url.match(/youtube.com|youtu.be/)

  if (!url) return null
  if (isYoutube) {
    return <ReactPlayer url={url} width={'100%'} height={'auto'} />
  }

  return <img src={url} alt="media" className="h-auto w-56" onError={onError} />
}
