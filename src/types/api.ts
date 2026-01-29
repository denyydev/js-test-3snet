export type MonthData = {
  income: number
  activePartners: number
}

export type MonthEntry = {
  income: number
  activePartners: number
  plan: MonthData
  fact: MonthData
} | null

export type TableRow = {
  id: number
  adminId: number
  adminName: string
  months: MonthEntry[]
  year: number
}

export type AffiliateDataResponse = {
  success: boolean
  data: {
    total: MonthEntry[]
    table: TableRow[]
  }
}
