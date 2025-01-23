import { useEffect, useRef } from 'react'

export function DefaultCell({ value, onRowClick }) {
  const ref = useRef(null)

  const handleResize = () => {
    if (!ref.current) return
    if (ref.current?.scrollWidth > ref.current?.offsetWidth) {
      ref.current.classList.add('truncate')
    } else {
      ref.current.classList.remove('truncate')
    }
  }

  useEffect(() => {
    if (!ref.current) return
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return (
    <div className="whitespace-nowrap text-sm" ref={ref} onClick={onRowClick}>
      {value}
    </div>
  )
}
