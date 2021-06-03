import React from 'react';
import * as vega from 'vega';
import { compile } from 'vega-lite';

function Display({
  spec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    description: 'A basic bar chart example, with value labels shown upon mouse hover.',
    width: 400,
    height: 200,
    padding: 5,
    data: [
      {
        name: 'table',
        values: [
          { category: 'A', amount: 28 },
          { category: 'B', amount: 55 },
          { category: 'C', amount: 43 },
          { category: 'D', amount: 91 },
          { category: 'E', amount: 81 },
          { category: 'F', amount: 53 },
          { category: 'G', amount: 19 },
          { category: 'H', amount: 87 },
        ],
      },
    ],

    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' },
        ],
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: 'category' },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      {
        name: 'yscale',
        domain: { data: 'table', field: 'amount' },
        nice: true,
        range: 'height',
      },
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale' },
      { orient: 'left', scale: 'yscale' },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'category' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'amount' },
            y2: { scale: 'yscale', value: 0 },
          },
          update: {
            fill: { value: 'steelblue' },
          },
          hover: {
            fill: { value: 'red' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          enter: {
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            fill: { value: '#333' },
          },
          update: {
            x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
            text: { signal: 'tooltip.amount' },
            fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
          },
        },
      },
    ],
  },
  mode = 'vega',
  config = {
    background: '#333',
    title: { color: '#fff', subtitleColor: '#fff' },
    style: { 'guide-label': { fill: '#fff' }, 'guide-title': { fill: '#fff' } },
    axis: { domainColor: '#fff', gridColor: '#888', tickColor: '#fff' },
  },
  setView = () => {},
}) {
  const refContainer = React.useRef(null);
  const getRuntime = (spec, new_mode, config) => {
    switch (new_mode) {
      case 'vega':
        return vega.parse(spec, config);
      case 'vega-lite':
        return vega.parse(compile(spec, { config }).spec);
      default:
        return spec;
    }
  };

  const renderVega = (spec, new_mode) => {
    if (Object.keys(spec).length) {
      try {
        const runtime = getRuntime(spec, new_mode, config);
        // let runtime = vega.parse(runtimeSpec, config);
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

  const renderCustomChart = (spec, new_mode) => {
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

  const renderChart = (spec, new_mode) => {
    switch (new_mode) {
      case 'vega':
        return renderVega(spec, new_mode);
      case 'vega-lite':
        return renderVega(spec, new_mode);
      default:
        return spec;
    }
  };

  React.useEffect(() => {
    renderChart(spec, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec, mode]);

  return <div style={{ height: 'inherit', overflow: 'auto' }} ref={refContainer}></div>;
}

export default Display;
