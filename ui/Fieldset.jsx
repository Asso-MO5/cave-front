export function Fieldset({ children, title, required }) {
  return (
    <fieldset>
      <legend className="text-sm font-bold">
        <span className="text-mo-primary">{title}</span>
        {required && <span className="text-mo-accent">*</span>}
      </legend>
      <div className="mt-1">{children}</div>
    </fieldset>
  )
}
