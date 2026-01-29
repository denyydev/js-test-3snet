// Logic for 6-month window
export const getMonthWindow = (currentMonth: Date): Date[] => {
  const months: Date[] = []
  for (let i = 0; i < 6; i++) {
    const month = new Date(currentMonth)
    month.setMonth(currentMonth.getMonth() + i)
    months.push(month)
  }
  return months
}

