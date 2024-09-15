export function Placeholder({ type = 'classic' }) {
  return (
    <div
      data-type={type}
      className="animate-pulse bg-gray-200 dark:bg-gray-900 w-full rounded-sm data-[type=classic]:h-5 data-[type=title]:h-7 data-[type=editor]:h-36 data-[type=large]:h-20 data-[type=select]:h-[2.8rem] data-[type=button]:h-[1.7rem]"
    ></div>
  )
}

export function PlaceholderWrapper({ children, loading, type = 'text' }) {
  if (loading) return <Placeholder type={type} />
  return children
}
