import { PageList } from '@/layouts/page-list'

export default async function Machine() {
  return (
    <PageList
      title="Machines"
      actions={
        <a href="/admin/machines/new" className="btn">
          Nouvelle machine
        </a>
      }
    >
      <div>cdfse</div>
    </PageList>
  )
}
