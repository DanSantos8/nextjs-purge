import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json()
    
    if (!tag) {
      return Response.json(
        { message: 'Tag is required' }, 
        { status: 400 }
      )
    }

    revalidateTag(tag)
    
    return Response.json({ 
      revalidated: true, 
      tag,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return Response.json(
      { message: 'Revalidation error' }, 
      { status: 500 }
    )
  }
}