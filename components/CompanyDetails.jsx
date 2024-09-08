import { getActivities } from '@/utils/get-activities'
import { useCompany } from './Company'
import { StrReadEdit } from './StrReadEdit'
import { TextReadEdit } from './TextreadEdit'
import { MediaReadEdit } from './MediaReadEdit'
import { YearReadEdit } from './YearReadEdit'

export function CompanyDetails() {
  const { company, update } = useCompany()
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr] w-full m-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs p-1 rounded-sm text-mo-white bg-mo-primary">
              {getActivities(company.activities).join(', ')}
            </div>
            <StrReadEdit
              update={(value) => update({ name: value })}
              defaultValue={company.name}
            />
          </div>
        </div>
        <TextReadEdit
          defaultValue={company.description}
          update={(description) => update({ description })}
        />
      </div>

      <div className="flex flex-col">
        <MediaReadEdit
          name={company.name}
          url={company.logo_url}
          update={(partial) => {
            const keys = Object.keys(partial)

            if (keys.includes('id')) update({ logo_id: partial.id })
            if (keys.includes('file')) update({ logo: partial.file })
            if (keys.includes('url')) update({ logo_url: partial.url })
          }}
        />
        <YearReadEdit
          defaultValue={company.borned_at}
          label="Année de création"
          update={(borned_at) => update({ borned_at })}
        />
      </div>
    </div>
  )
}
