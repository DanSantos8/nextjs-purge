import { unstable_cache } from 'next/cache'

async function getFarmData() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/farm`, {
    next: { 
      tags: ['farm-data']
    }
  })
  return res.json()
}

const getCachedFarmData = unstable_cache(
  getFarmData,
  ['farm'],
  { tags: ['farm-data'] }
)


export default async function FarmPage() {
  const farm = await getCachedFarmData()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{farm.title}</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Animals</h2>
          <ul className="list-disc list-inside">
            {farm.animals.map((animal: string) => (
              <li key={animal}>{animal}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Crops</h2>
          <ul className="list-disc list-inside">
            {farm.crops.map((crop: string) => (
              <li key={crop}>{crop}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <p className="mt-6 text-gray-600">
        Last updated: {new Date(farm.lastUpdated).toLocaleString()}
      </p>
    </div>
  )
}