const STATUS = {
  draft: {
    color: 'bg-mo-primary',
    text: 'Brouillon',
  },
  distributed: {
    color: 'bg-mo-valid',
    text: 'Distribué',
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
  refused: {
    color: 'bg-mo-error',
    text: 'Refusé',
  },
  already_distributed: {
    color: 'bg-mo-error',
    text: 'Déjà distribué',
  },
}
export function StatusChip({ status }) {
  const st = STATUS?.[status] || STATUS.draft

  return (
    <div
      className={`
        ${st.color} rounded-sm p-1 text-mo-white
        text-xs text-center flex items-center justify-center
      `}
    >
      {st.text}
    </div>
  )
}
