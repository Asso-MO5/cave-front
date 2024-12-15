const STATUS = {
  draft: {
    color: 'bg-mo-primary',
    text: 'Brouillon',
  },
  notDistributed: {
    color: 'bg-mo-warning',
    text: 'Non distribué',
  },
  review: {
    color: 'bg-mo-warning',
    text: 'En relecture',
  },
  published: {
    color: 'bg-mo-valid',
    text: 'Publié',
  },
  validated: {
    color: 'bg-mo-valid',
    text: 'Validé',
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
