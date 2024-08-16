import dynamic from 'next/dynamic'

const EditorRead = dynamic(
  () => import('./editor-read').then((c) => c.EditorRead),
  {
    ssr: false,
  }
)

export function MachineRead({ machine }) {
  console.log('machine :', machine)
  return (
    <div className="flex flex-col bn-container light bn-mantine text-base text-current">
      <h3>Fabricant</h3>
      <div>{machine?.manufacturer?.name || '---'}</div>
      {machine.cover_id && (
        <img src={machine.cover_url} alt={machine.name} className="w-28" />
      )}
      <EditorRead value={machine.description} />
    </div>
  )
}
