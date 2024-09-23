const STATUS = {
  draft: {
    color: 'bg-mo-primary',
    text: 'Brouillon',
  },
  review: {
    color: 'bg-mo-warning',
    text: 'En relecture',
  },
  published: {
    color: 'bg-mo-valid',
    text: 'Publié',
  },
}
export function StatusChip({ status }) {
  const st = STATUS?.[status] || STATUS.draft

  return (
    <div
      className={`${st.color} rounded-sm p-1 text-mo-white text-xs text-center`}
    >
      {st.text}
    </div>
  )
}
