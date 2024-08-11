import { EditorRead } from './editor-read'

export function MachineRead({ machine }) {
  return (
    <div className="flex flex-col bn-container light bn-mantine text-base text-current">
      <EditorRead value={machine.description} />
    </div>
  )
}
