export function getCurrentMonthIndex(): number {
  return new Date().getMonth()
}

export function getMonthWindow(startIndex: number, size: number): number[] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0')
  }
  
  if (startIndex < 0 || startIndex > 11) {
    throw new Error('Start index must be between 0 and 11')
  }
  
  const months: number[] = []
  for (let i = 0; i < size; i++) {
    months.push((startIndex + i) % 12)
  }
  return months
}

export function shiftMonthIndex(index: number, delta: number): number {
  if (index < 0 || index > 11) {
    throw new Error('Index must be between 0 and 11')
  }
  
  return ((index + delta) % 12 + 12) % 12
}

export function getMonthLabel(index: number): string {
  if (index < 0 || index > 11) {
    throw new Error('Index must be between 0 and 11')
  }
  
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  
  return monthNames[index]
}
