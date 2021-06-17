import React from 'react';
import * as vega from 'vega';
import { compile } from 'vega-lite';

import BarChartRace from './bar_chart_race/chart.js';

function Chart({ spec, mode, theme, setView = () => {} }) {
  const refContainer = React.useRef(null);

  const renderVega = (spec, new_mode, theme) => {
    if (Object.keys(spec).length) {
      try {
        let runtime = null;
        if (new_mode === 'vega-lite') {
          runtime = vega.parse(compile(spec, { config: theme }).spec);
        } else {
          runtime = vega.parse(spec, theme);
        }
        const loader = vega.loader();
        const view = new vega.View(runtime, {
          loader,
        }).hover();

        view.logLevel(vega.Warn).renderer('svg').initialize(refContainer.current).runAsync();
        setView(view);
      } catch (error) {
        refContainer.current.innerHTML = error.message;
      }
    }
  };

  const renderCustomChart = (spec, new_mode, theme) => {
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

  const renderChart = (spec, new_mode, theme) => {
    switch (new_mode) {
      case 'vega':
        return renderVega(spec, new_mode, theme);
      case 'vega-lite':
        return renderVega(spec, new_mode, theme);
      case 'custom':
        return renderCustomChart(spec, new_mode, theme);
      default:
        return spec;
    }
  };

  React.useEffect(() => {
    renderChart(spec, mode, theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec, mode, theme]);

  return <div style={{ height: 'inherit', overflow: 'auto' }} ref={refContainer}></div>;
}

export default Chart;
