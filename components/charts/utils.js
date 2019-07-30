export function formatNumber(number) {
  return new Intl.NumberFormat().format(number)
}

export function formatTooltip(tooltipItem, data, unit) {
  var label = data.datasets[tooltipItem.datasetIndex].label || ''

  if (label) {
    label += ': '
  }
  label += formatNumber(tooltipItem.yLabel) + ' ' + unit
  return label
}

export function formatPieTooltip(tooltipItem, data, unit) {
  let total = 0
  data.datasets[0].data.forEach(item => (total += item))
  const value = data.datasets[0].data[tooltipItem.index]
  const percentage = Math.round((value / total) * 100)

  return `${formatNumber(value)} ${unit}, ${percentage}%`
}

export const months = [
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
  'December'
]

export const backgroundColor = [
  'rgba(85, 152, 218, 0.3)',
  'rgba(232, 116, 59, 0.3)',
  'rgba(25, 169, 121, 0.3)',
  'rgba(237, 74, 123, 0.3)',
  'rgba(148, 94, 207, 0.3)',
  'rgba(19, 164, 180, 0.3)',
  'rgba(82, 93, 244, 0.3)',
  'rgba(191, 57, 158, 0.3)',
  'rgba(108, 136, 147, 0.3)',
  'rgba(238, 104, 104, 0.3)',
  'rgba(47, 100, 151, 0.3)'
]

export const borderColor = [
  'rgba(85, 152, 218, 1)',
  'rgba(232, 116, 59, 1)',
  'rgba(25, 169, 121, 1)',
  'rgba(237, 74, 123, 1)',
  'rgba(148, 94, 207, 1)',
  'rgba(19, 164, 180, 1)',
  'rgba(82, 93, 244, 1)',
  'rgba(191, 57, 158, 1)',
  'rgba(108, 136, 147, 1)',
  'rgba(238, 104, 104, 1)',
  'rgba(47, 100, 151, 1)'
]
