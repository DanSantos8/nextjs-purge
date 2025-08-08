import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json()
    
    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content are required' },
        { status: 400 }
      )
    }

    if (!['farm.json', 'garden.json'].includes(filename)) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    try {
      JSON.parse(content)
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    const filePath = join(process.cwd(), 'app', 'json', filename)
    
    await writeFile(filePath, content, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving JSON:', error)
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    )
  }
}
