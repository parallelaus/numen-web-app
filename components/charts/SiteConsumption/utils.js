import { months, backgroundColor, borderColor } from '../utils'

export default function(storeStatsSites) {
  let data = {
    labels: [],
    datasets: []
  }
  const xAxisLabels = new Set()

  storeStatsSites.forEach((siteStat, idx) => {
    if (siteStat.length > 0) {
      // Consumption Dataset
      const consumption = {
        // label: siteMap.get(siteStat[0].entity_id).name,
        backgroundColor: backgroundColor[idx],
        borderColor: borderColor[idx],
        borderWidth: 1,
        hoverBorderWidth: 2,
        data: []
      }
      siteStat.forEach(stat => {
        const date = new Date(stat.date)
        xAxisLabels.add(date.getUTCMonth())
        consumption.data.push(Math.round(stat.consumption_kwh))
      })
      data.datasets.push(consumption)

      // Max Demand Dataset
      const maxDemand = {
        type: 'line',
        yAxisID: 'max_demand',
        // label: siteMap.get(siteStat[0].entity_id).name,
        borderColor: borderColor[idx],
        fill: false,
        borderWidth: 1,
        pointBackgroundColor: borderColor[idx],
        lineTension: 0.1,
        spanGaps: true,
        data: []
      }
      siteStat.forEach(stat => {
        maxDemand.data.push(Math.round(stat.max_demand_kva))
      })
      data.datasets.push(maxDemand)
    }
  })
  xAxisLabels.forEach(item => data.labels.push(months[item]))
  return data
}
