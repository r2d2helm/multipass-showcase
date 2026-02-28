import type { DataProvider } from './types'
import { FakeProvider } from './fake-provider'
import { LiveProvider } from './live-provider'

let provider: DataProvider | null = null

export function getDataProvider(): DataProvider {
  if (provider) return provider

  const mode = process.env.DATA_MODE || 'fake'

  if (mode === 'live') {
    provider = new LiveProvider()
  } else {
    provider = new FakeProvider()
  }

  return provider
}
