export function Fieldset({ children, title, required }) {
  return (
    <fieldset>
      <legend className="text-base font-bold">
        <span className="text-mo-primary">{title}</span>
        {required && <span className="text-mo-accent">*</span>}
      </legend>
      <div className="mt-1 ml-2">{children}</div>
    </fieldset>
  )
}
