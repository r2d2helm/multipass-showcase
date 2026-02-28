import { NextResponse } from 'next/server'
import { getDataProvider } from '@/lib/data-provider'

export const revalidate = 5 // ISR cache 5s

export async function GET() {
  try {
    const provider = getDataProvider()
    const data = await provider.getArchitectureData()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch architecture data' },
      { status: 500 }
    )
  }
}
