import { NextResponse } from 'next/server'
import farmData from '../../json/farm.json'

export async function GET() {
  return NextResponse.json({...farmData, lastUpdated: new Date().toISOString()})
}
