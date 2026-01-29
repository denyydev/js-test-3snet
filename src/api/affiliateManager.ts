import { getJson } from './client'
import type { AffiliateDataResponse } from '../types/api'

export async function fetchAffiliateManagerData(): Promise<AffiliateDataResponse> {
  return getJson<AffiliateDataResponse>('https://3snet.co/js_test/api.json')
}
