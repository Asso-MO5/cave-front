export function Fieldset({ children, title, required }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-base font-bold">
        <span className="text-mo-primary">{title}</span>
        {required && <span className="text-mo-accent">*</span>}
      </legend>
      {children}
    </fieldset>
  )
}
