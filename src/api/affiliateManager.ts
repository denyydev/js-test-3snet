import { client } from './client'
import type { AffiliateDataResponse } from '../types/api'

export const affiliateManagerApi = {
  getData: async (): Promise<AffiliateDataResponse> => {
    return client.get<AffiliateDataResponse>('/api/affiliate-manager')
  },
}

