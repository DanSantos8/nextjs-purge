import { unstable_cache } from "next/cache"

async function getGardenData() {

  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/garden`, {
    next: { 
      tags: ['garden-data']
    }
  })
  return res.json()
}


const getCachedGardenData = unstable_cache(
  getGardenData,
  ['garden'],
  { tags: ['garden-data'] }
)


export default async function GardenPage() {
  const garden = await getCachedGardenData()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{garden.title}</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Flowers</h2>
          <ul className="list-disc list-inside">
            {garden.flowers.map((flower: string) => (
              <li key={flower}>{flower}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Vegetables</h2>
          <ul className="list-disc list-inside">
            {garden.vegetables.map((vegetable: string) => (
              <li key={vegetable}>{vegetable}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <p className="mt-6 text-gray-600">
        Last updated: {new Date(garden.lastUpdated).toLocaleString()}
      </p>
    </div>
  )
}