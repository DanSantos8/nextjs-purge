'use client'

import { useState } from 'react'

export default function CacheManagement() {
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const handlePurge = async (page: 'farm' | 'garden') => {
    setLoading(page)
    setMessage('')
    
    try {
      const tag = `${page}-data`
      
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag })
      })
      
      const data = await response.json()
      
      if (data.revalidated) {
        setMessage(`✅ ${page} page cache cleared successfully!`)
      } else {
        setMessage('❌ Error clearing cache')
      }
    } catch (error) {
      setMessage('❌ Request error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={() => handlePurge('farm')}
          disabled={!!loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading === 'farm' ? 'Clearing...' : '🚜 Purge Farm Cache'}
        </button>
        
        <button
          onClick={() => handlePurge('garden')}
          disabled={!!loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading === 'garden' ? 'Clearing...' : '🌻 Purge Garden Cache'}
        </button>
      </div>
      
      {message && (
        <div className="mt-6 p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-black">{message}</p>
        </div>
      )}
    </>
  )
}
