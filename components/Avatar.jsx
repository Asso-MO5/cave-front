'use-client'

export function Avatar({ src, alt, size, nickname }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={src}
        alt={alt}
        className={`rounded-full`}
        width={size}
        height={size}
      />
      <div className="font-secondary">{nickname}</div>
    </div>
  )
}
