'use client'

import { useState } from 'react'

interface JsonEditorProps {
  initialFarmData: string
  initialGardenData: string
}

export default function JsonEditor({ initialFarmData, initialGardenData }: JsonEditorProps) {
  const [farmData, setFarmData] = useState(initialFarmData)
  const [gardenData, setGardenData] = useState(initialGardenData)
  const [editing, setEditing] = useState<'farm' | 'garden' | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async (type: 'farm' | 'garden') => {
    setSaving(true)
    setMessage('')
    
    try {
      const content = type === 'farm' ? farmData : gardenData
      const filename = `${type}.json`
      
      const response = await fetch('/api/save-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename, content })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(`✅ ${type}.json saved successfully!`)
        setEditing(null)
      } else {
        setMessage(`❌ Error saving ${type}.json: ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Request error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (type: 'farm' | 'garden') => {
    setEditing(type)
    setMessage('')
  }

  const handleCancel = () => {
    setEditing(null)
    setMessage('')
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">farm.json</h3>
          {editing === 'farm' ? (
            <div className="space-x-2">
              <button
                onClick={() => handleSave('farm')}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEdit('farm')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Edit
            </button>
          )}
        </div>
        <textarea
          value={farmData}
          onChange={(e) => setFarmData(e.target.value)}
          disabled={editing !== 'farm'}
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 disabled:bg-gray-100 text-black"
          placeholder="JSON content..."
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">garden.json</h3>
          {editing === 'garden' ? (
            <div className="space-x-2">
              <button
                onClick={() => handleSave('garden')}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEdit('garden')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Edit
            </button>
          )}
        </div>
        <textarea
          value={gardenData}
          onChange={(e) => setGardenData(e.target.value)}
          disabled={editing !== 'garden'}
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 disabled:bg-gray-100 text-black"
          placeholder="JSON content..."
        />
      </div>

      {message && (
        <div className="mt-6 p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-black">{message}</p>
        </div>
      )}
    </>
  )
}
