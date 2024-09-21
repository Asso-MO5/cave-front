import { useId } from 'react'

export function Radio({
  label,
  checked,
  valid = false,
  id: _id,
  onCheck,
  disabled = false,
  name = '',
  type = 'radio',
}) {
  const id = _id || useId()

  const handleKeyPress = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault()
      onCheck?.(!checked)
    }
  }

  return (
    <>
      <label
        htmlFor={id}
        data-valid={valid}
        data-label={!!label}
        data-disabled={disabled}
        className={`
            select-none data-[valid=true]:text-mo-valid disabled:cursor-not-allowed disabled:opacity-[0.6] 
            disabled:pointer-events-none disabled:cursor-normal cursor-pointer
            data-[label=true]:grid grid-cols-[20px_auto] gap-1 items-center
        `}
      >
        <div
          data-checked={checked}
          data-valid={valid}
          data-disabled={disabled}
          data-type={type}
          className={`
                w-5 h-5 border-2 transition-all duration-200 relative
                data-[checked=true]:border-mo-primary border-mo-border
                data-[disabled=true]:opacity-[0.6] data-[disabled=true]:cursor-not-allowed
                data-[checked=true][valid=true]:border-mo-valid
                data-[type=checkbox]:rounded-sm rounded-full
            `}
          tabIndex={1}
          onKeyDown={handleKeyPress}
          role={type}
          aria-checked={checked}
        >
          <div
            data-checked={checked}
            data-valid={valid}
            data-type={type}
            className={`
                absolute inset-0 transition-all duration-200
                data-[checked=true]:bg-mo-primary border-2 border-mo-white
                data-[checked=true][valid=true]:bg-base-valid
                data-[type=checkbox]:rounded-sm rounded-full
            `}
          />
        </div>

        {label && <div className="select-none">{label}</div>}
      </label>
      <input
        type={type}
        checked={checked}
        onChange={() => onCheck?.(!checked)}
        className="hidden"
        aria-hidden
        disabled={disabled}
        id={id}
        name={name || id}
      />
    </>
  )
}
