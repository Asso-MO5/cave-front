import { Button } from '@/ui/Button'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'

export function ExportBtn({ selectedIds, selectedTotal }) {
  const [loading, setLoading] = useState(false)

  const handleDl = async () => {
    if (loading || selectedIds.length === 0) return
    setLoading(true)
    const ctrl = new AbortController()
    try {
      const response = await fetcher.post(`/items/export`, ctrl.signal, {
        exportType: 'csv',
        type: 'cartel',
        ids: selectedIds,
        selectedTotal,
      })
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `items-${selectedTotal ? 'all' : selectedIds.length}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={selectedIds.length === 0}
      onClick={handleDl}
      loading={loading}
    >
      {loading ? '...' : `Exporter (csv)`}
    </Button>
  )
}
