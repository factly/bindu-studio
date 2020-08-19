import React from 'react';
import { useSelector } from 'react-redux';
import * as vega from 'vega';
import { compile } from 'vega-lite';
import CustomChart from './custom_chart.js';
import * as vegaThemes from 'vega-themes';

function Chart() {
  const { spec, mode, config } = useSelector((state) => {
    return { spec: state.chart.spec, mode: state.chart.mode, config: state.chart.config };
  });

  const chartContainer = React.useRef(null);

  const getSpec = () => {
    switch (mode) {
      case 'vega':
        return spec;
      case 'vega-lite':
        return compile({ ...spec, config: vegaThemes[config] }).spec;
      default:
        return spec;
    }
  };

  const renderVega = () => {
    if (Object.keys(spec).length) {
      const spec = getSpec();
      let runtime = vega.parse(spec, vegaThemes[config]);
      const loader = vega.loader();
      const view = new vega.View(runtime, {
        loader,
      }).hover();

      view.logLevel(vega.Warn).renderer('svg').initialize(chartContainer.current).runAsync();
    }
  };

  const renderChart = () => {
    chartContainer.current.innerHTML = '';
    switch (mode) {
      case 'vega':
        return renderVega();
      case 'vega-lite':
        return renderVega();
      case 'custom':
        return CustomChart(spec, chartContainer.current);
      default:
        return spec;
    }
  };

  React.useEffect(() => {
    renderChart();
  }, [spec, config]);

  return <div id="chart" ref={chartContainer}></div>;
}

export default Chart;
