import { DefaultCell } from './DefaultCell'

export function BoldCell({ data, onClick }) {
  return (
    <span className="bold" onClick={onClick}>
      <DefaultCell value={data} />
    </span>
  )
}
