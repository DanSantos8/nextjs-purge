import { NextResponse } from 'next/server'
import gardenData from '../../json/garden.json'

export async function GET() {
  return NextResponse.json({...gardenData, lastUpdated: new Date().toISOString()})
}   