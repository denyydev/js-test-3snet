export type MonthData = {
  income: number
  activePartners: number
}

export type MonthEntry = {
  month: number
  year: number
  plan: MonthData
  fact: MonthData
} | null

export type TableRow = {
  manager: string
  months: MonthEntry[]
  total: MonthData
}

export type AffiliateDataResponse = {
  data: {
    total: MonthEntry[]
    table: TableRow[]
  }
}
