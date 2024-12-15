import { Button } from '@/ui/Button'
import { Modal as ModalUi } from '@/ui/Modal'
import { fetcher } from '@/utils/fetcher'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export function Modal({ rowData, setData }) {
  const [loading, setLoading] = useState(false)
  const options = useMemo(() => {
    const opts = []

    if (rowData.email) opts.push({ value: 'email', label: 'envoyer un email' })
    opts.push({ value: 'download', label: 'Télécharger un ZIP' })

    return opts
  }, [rowData])

  const [optValue, setOptValue] = useState(options[0].value)

  const handleDistribution = async () => {
    const ctrl = new AbortController()
    setLoading(true)

    console.log(rowData)
    try {
      const res = await fetcher.get(
        `/gifts_packs/${rowData.id}/distribe/${optValue}`,
        ctrl.signal
      )

      if (!res.ok) throw new Error('Erreur inconnue')

      if (optValue === 'email') {
        toast.success('Email envoyé avec succès')
      }

      if (optValue === 'download') {
        toast.success('Téléchargement en cours')
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `pack-${rowData.retailer}_${rowData.campain}.zip`
        a.click()
        window.URL.revokeObjectURL(url)
      }
      setData({
        ...rowData,
        status: 'distributed',
      })
    } catch (e) {
      toast.error(`${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalUi
      content={
        <div className="text-center flex flex-col gap-3 ">
          <div className="font-bold">
            {rowData.retailer} - {rowData.campain}
          </div>
          <div>Comment voulez-vous distribuer ce pack ?</div>
          <select onChange={(e) => setOptValue(e.target.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex justify-center items-center">
            <p className="text-center italic max-w-64 text-xs">
              Vous êtes sur le point de distribuer le pack de cadeaux, Si vous
              distribuez ce pack, vous ne pourrez plus le modifier, ni le
              supprimer.
            </p>
          </div>
          {loading && <div>Chargement...</div>}
        </div>
      }
      onConfirm={handleDistribution}
    >
      <div className="flex justify-center items-center">
        <Button>Distribuer</Button>
      </div>
    </ModalUi>
  )
}
