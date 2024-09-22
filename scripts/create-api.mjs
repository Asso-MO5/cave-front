import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const BASE_FOLDER = '_api'

/**
 * @description Create API files from swagger.json
 */
async function createApi() {
  console.log('Creating API...')
  const apiFolder = path.join(process.cwd(), BASE_FOLDER)
  console.log('API Folder:', apiFolder)
  const isExist = existsSync(path.join(process.cwd(), BASE_FOLDER))
  if (!isExist) mkdirSync(path.join(process.cwd(), BASE_FOLDER))

  let apiJson = null
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/swagger.json')
    apiJson = await res.json()

    const api = Object.keys(apiJson.paths).reduce((acc, path) => {
      const obj = apiJson.paths[path]

      Object.keys(obj).forEach((method) => {
        const { operationId, summary, description } = obj[method]
        acc[operationId] = {
          path,
          description: summary,
          roles: description?.split('<br/>').filter((c) => c !== ''),
          method,
        }
      })
      return acc
    }, {})

    console.log('Creating files...')

    writeFileSync(
      path.join(apiFolder, 'operations.js'),
      `export const operations = ${JSON.stringify(api, null, 2)}`,
      'utf8'
    )
    console.log('API created!')
  } catch (error) {
    console.log('Error fetching routes:', error)
  }
}

createApi()
