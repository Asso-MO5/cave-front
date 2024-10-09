import { Alert } from '@/ui/Alert'
import { Table } from '@/ui/table/Table'
import { fetcher } from '@/utils/fetcher'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

export function ImportBtn({ type, onFinish }) {
  const inputRef = useRef()
  const [isDragOver, setIsDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [csv, setCsv] = useState('')

  const handleCheckFile = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const csvFlat = Buffer.from(
        reader.result.split(',')[1],
        'base64'
      ).toString()

      const parseCsv = csvFlat
        .split('\n')
        .slice(1)
        .map((line) => {
          const regex = /(".*?"|[^";]+)(?=\s*;|\s*$)/g
          const matches = line.match(regex)
          if (!matches) {
            return null
          }

          const [
            location,
            category,
            name,
            description,
            manufacturer,
            release_year,
            origin,
          ] = matches.map((field) => field.replace(/(^"|"$)/g, ''))

          return {
            location,
            category,
            name,
            description,
            manufacturer,
            release_year,
            origin,
          }
        })
        .filter((line) => line !== null)

      setCsv(parseCsv)
    }
    reader.readAsDataURL(file)
  }

  const handleImport = async () => {
    if (loading || !csv) return
    setLoading(true)
    const ctrl = new AbortController()
    try {
      const response = await fetcher.post(`/items/import`, ctrl.signal, {
        importType: 'csv',
        type,
        items: csv,
      })
      const resJson = await response.json()
      if (resJson.error) {
        toast.error(resJson.error)
      } else {
        toast.success(`importation réussie`)
        onFinish()
      }
    } catch (e) {
      console.error(e)
      toast.error(e)
    } finally {
      setLoading(false)
      handleCloseModal()
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleCheckFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleCloseModal = () => {
    setCsv('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        data-is-drag-over={isDragOver}
        className="border bg-mo-white border-mo-primary p-1 rounded-md cursor-pointer justify-center flex items-center text-center transition-all data-[is-drag-over=true]:border-mo-valid"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        title={`
Colonne séparée par ";"
La première ligne sera ignorée
liste des colonnes:
- Emplacement
- Catégorie
- Nom
- Description
- Fabricant
- Année de sortie
- Provenance
          `}
      >
        <label htmlFor="import_csv_items" className="cursor-pointer">
          importer (csv)
        </label>
        <input
          type="file"
          id="import_csv_items"
          accept=".csv"
          name="csv"
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleCheckFile(e.target.files[0])}
        />
      </div>
      <Alert
        open={csv.length > 0}
        close={handleCloseModal}
        confirmTxt={`Importer (${csv.length})`}
        onConfirm={handleImport}
        loading={loading}
        content={
          <div className="h-[95dvh] w-[95dvw]">
            <Table
              data={csv}
              cols={[
                {
                  name: 'Emplacement',
                  key: 'location',
                },
                {
                  name: 'Catégorie',
                  key: 'category',
                },
                {
                  name: 'Nom',
                  key: 'name',
                },
                {
                  name: 'description',
                  key: 'description',
                },
                {
                  name: 'Fabricant',
                  key: 'manufacturer',
                },
                {
                  name: 'Année de sortie',
                  key: 'release_year',
                },
                {
                  name: 'Provenance',
                  key: 'origin',
                },
              ]}
            />
          </div>
        }
      />
    </div>
  )
}
