import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'fs'
import path from 'path'

const BASE_FOLDER = 'api'

async function createApi() {
  console.log('Creating API...')
  const apiFolder = path.join(process.cwd(), BASE_FOLDER)
  console.log('API Folder:', apiFolder)
  const isExist = existsSync(path.join(process.cwd(), BASE_FOLDER))
  if (!isExist) mkdirSync(path.join(process.cwd(), BASE_FOLDER))
  console.log('fetching routes...', process.env.NEXT_PUBLIC_API_URL)
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL)
    const routes = await res.json()
    writeFileSync(
      path.join(apiFolder, 'api.js'),
      `export const API = ${JSON.stringify(routes)}`,
      'utf8'
    )
    console.log('API created!')
  } catch (error) {
    console.log('Error fetching routes:', error)
  }
}

createApi()
