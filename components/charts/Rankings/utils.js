import { backgroundColor, borderColor, formatNumber } from "../utils";

export function storeDataToRankingData(store, date) {
  let data = [];
  const siteStats = store.state.stats.sites;
  siteStats.forEach((siteStat) => {
    // find the date entry if it exists
    const dateStat = siteStat.find((stat) => stat.date.indexOf(date) == 0); // Date matches stat date
    if (dateStat) {
      const site = store.getters["site/siteById"](dateStat.entity_id);
      data.push({
        label: site.name,
        ...dateStat,
      });
    }
  });
  return data;
}

export function doughnutData(rankingData, field) {
  let chartData = {
    labels: [],
    datasets: [],
  };
  const dataset = {
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: [],
    hoverBorderWidth: [],
  };
  rankingData.forEach((item, idx) => {
    chartData.labels.push(item.label);
    dataset.data.push(Math.round(item[field]));
    dataset.backgroundColor.push(backgroundColor[idx]);
    dataset.borderColor.push(borderColor[idx]);
    dataset.borderWidth.push(1);
    dataset.hoverBorderWidth.push(2);
  });

  chartData.datasets.push(dataset);
  return chartData;
}

export function tableData(rankingData) {
  let kWhTotal = 0;
  rankingData.forEach((item) => (kWhTotal += item.consumption_kwh));

  const output = [];
  rankingData.forEach((item, _idx) => {
    const line = {
      name: item.label,
      consumption_kwh: formatNumber(Math.round(item.consumption_kwh)),
      consumption_percent: Math.round((item.consumption_kwh / kWhTotal) * 100),
    };
    output.push(line);
  });
  return output;
}
