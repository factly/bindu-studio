import BarChartRace from './bar_chart_race/chart.js';
const CustomChart = (spec, container) => {
  const type = spec.type;
  switch (type) {
    case 'bar-chart-race':
      var customChart = new BarChartRace(container, spec);
      customChart.render();
      break;
    default:
      return null;
  }
};

export default CustomChart;
