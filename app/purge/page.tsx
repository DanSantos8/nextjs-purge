import Link from 'next/link'
import { readFile } from 'fs/promises'
import { join } from 'path'
import CacheManagement from './components/CacheManagement'
import JsonEditor from './components/JsonEditor'

async function getJsonData() {
  try {
    const farmPath = join(process.cwd(), 'app', 'json', 'farm.json')
    const gardenPath = join(process.cwd(), 'app', 'json', 'garden.json')
    
    const [farmContent, gardenContent] = await Promise.all([
      readFile(farmPath, 'utf-8'),
      readFile(gardenPath, 'utf-8')
    ])
    
    return {
      farmData: farmContent,
      gardenData: gardenContent
    }
  } catch (error) {
    console.error('Error loading JSON data:', error)
    return {
      farmData: '',
      gardenData: ''
    }
  }
}

export default async function PurgePage() {
  const { farmData, gardenData } = await getJsonData()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cache & JSON Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cache Management</h2>
        <CacheManagement />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
        <JsonEditor 
          initialFarmData={farmData}
          initialGardenData={gardenData}
        />
      </div>
      
      <div className="mt-8 space-y-2">
        <Link href="/farm" className="block text-blue-600 hover:underline">
          → View Farm page
        </Link>
        <Link href="/garden" className="block text-blue-600 hover:underline">
          → View Garden page
        </Link>
      </div>
    </div>
  )
}