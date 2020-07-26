import React from 'react';
import { useSelector } from 'react-redux';
import * as vega from 'vega';
import { compile } from 'vega-lite';

import BarChartRace from './bar_chart_race/chart.js';

function Chart() {
  const { spec, mode } = useSelector((state) => {
    return { spec: state.chart.spec, mode: state.chart.mode };
  });

  const refContainer = React.useRef(null);

  const getSpec = () => {
    switch (mode) {
      case 'vega':
        return spec;
      case 'vega-lite':
        return compile(spec).spec;
      default:
        return spec;
    }
  };

  const renderVega = () => {
    if (Object.keys(spec).length) {
      const spec = getSpec();
      let runtime = vega.parse(spec);
      const loader = vega.loader();
      const view = new vega.View(runtime, {
        loader,
      }).hover();

      view.logLevel(vega.Warn).renderer('svg').initialize(refContainer.current).runAsync();
    }
  };

  const renderCustomChart = () => {
    const type = spec.type;
    switch (type) {
      case 'bar-chart-race':
        var customChart = new BarChartRace(refContainer.current, spec);
        customChart.render();
        break;
      default:
        return null;
    }
  };

  const renderChart = () => {
    switch (mode) {
      case 'vega':
        return renderVega();
      case 'vega-lite':
        return renderVega();
      case 'custom':
        return renderCustomChart();
      default:
        return spec;
    }
  };

  React.useEffect(() => {
    renderChart();
  }, [spec]);

  return <div id="chart" ref={refContainer}></div>;
}

export default Chart;