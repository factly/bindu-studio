import ChartProperties from '../../../components/shared/chart_properties.js';
import Colors from '../../../components/shared/colors.js';

import Bars from '../../../components/shared/bars.js';
import Lines from '../../../components/shared/lines.js';
import Dots from '../../../components/shared/dots.js';

import Legend from '../../../components/shared/legend.js';
import LegendLabel from '../../../components/shared/legend_label.js';
import XAxis from '../../../components/shared/x_axis.js';
import YAxis from '../../../components/shared/y_axis.js';
import DataLabels from '../../../components/shared/data_labels.js';

import Spec from './default.json';

export const spec = Spec;

export const properties = [
  {
    name: 'Chart Properties',
    properties: [
      {
        prop: 'title',
        path: ['title'],
      },
      {
        prop: 'width',
        path: ['width'],
      },
      {
        prop: 'height',
        path: ['height'],
      },
      {
        prop: 'background',
        path: ['background'],
      },
    ],
    Component: ChartProperties,
  },
  {
    name: 'Bar Color',
    properties: [
      {
        prop: 'color',
        type: 'string',
        path: ['layer', 0, 'encoding', 'color', 'value'],
      },
    ],
    Component: Colors,
  },
  {
    name: 'Line Color',
    properties: [
      {
        prop: 'color',
        type: 'string',
        path: ['layer', 1, 'encoding', 'color', 'value'],
      },
    ],
    Component: Colors,
  },
  {
    name: 'Bars',
    properties: [
      {
        prop: 'opacity',
        path: ['layer', 0, 'encoding', 'opacity', 'value'],
      },
      {
        prop: 'corner_radius',
        path: ['layer', 0, 'mark', 'cornerRadius'],
      },
    ],
    Component: Bars,
  },
  {
    name: 'Lines',
    properties: [
      {
        prop: 'strokeWidth',
        path: ['layer', 1, 'mark', 'strokeWidth'],
      },
      {
        prop: 'opacity',
        path: ['layer', 1, 'mark', 'opacity'],
      },
      {
        prop: 'interpolate',
        path: ['layer', 1, 'mark', 'interpolate'],
      },
      {
        prop: 'strokeDash',
        path: ['layer', 1, 'mark', 'strokeDash'],
      },
    ],
    Component: Lines,
  },
  {
    name: 'Dots',
    properties: [
      {
        prop: 'mark',
        path: ['layer', 1, 'mark'],
      },
    ],
    Component: Dots,
  },
  {
    name: 'X Axis',
    properties: [
      {
        prop: 'title',
        path: ['layer', 0, 'encoding', 'x', 'axis', 'title'],
      },
      {
        prop: 'orient',
        path: ['layer', 0, 'encoding', 'x', 'axis', 'orient'],
      },
      {
        prop: 'format',
        path: ['layer', 0, 'encoding', 'x', 'axis', 'format'],
      },
      {
        prop: 'label_color',
        path: ['layer', 0, 'encoding', 'x', 'axis', 'labelColor'],
      },
      {
        prop: 'aggregate',
        path: ['layer', 0, 'encoding', 'x', 'aggregate'],
      },
      {
        prop: 'field',
        path: ['layer', 0, 'encoding', 'x', 'field'],
      },
    ],
    Component: XAxis,
  },
  {
    name: 'Y Axis',
    properties: [
      {
        prop: 'title',
        path: ['layer', 0, 'encoding', 'y', 'axis', 'title'],
      },
      {
        prop: 'orient',
        path: ['layer', 0, 'encoding', 'y', 'axis', 'orient'],
      },
      {
        prop: 'format',
        path: ['layer', 0, 'encoding', 'y', 'axis', 'format'],
      },
      {
        prop: 'label_color',
        path: ['layer', 0, 'encoding', 'y', 'axis', 'labelColor'],
      },
      {
        prop: 'aggregate',
        path: ['layer', 0, 'encoding', 'y', 'aggregate'],
      },
      {
        prop: 'field',
        path: ['layer', 0, 'encoding', 'y', 'field'],
      },
    ],
    Component: YAxis,
  },
  {
    name: 'Legend',
    properties: [
      {
        prop: 'title',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'title'],
      },
      {
        prop: 'fill_color',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'fillColor'],
      },
      {
        prop: 'symbol_type',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'symbolType'],
      },
      {
        prop: 'symbol_size',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'symbolSize'],
      },
      {
        prop: 'orient',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'orient'],
      },
    ],
    Component: Legend,
  },
  {
    name: 'Legend Label',
    properties: [
      {
        prop: 'label_align',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'labelAlign'],
      },
      {
        prop: 'label_baseline',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'labelBaseline'],
      },
      {
        prop: 'label_color',
        path: ['layer', 0, 'encoding', 'color', 'legend', 'labelColor'],
      },
    ],
    Component: LegendLabel,
  },
  {
    name: 'Data Labels',
    properties: [
      {
        prop: 'color',
        path: ['layer', 2, 'encoding', 'color', 'value'],
      },
      {
        prop: 'font_size',
        path: ['layer', 2, 'mark', 'fontSize'],
      },
      {
        prop: 'format',
        path: ['layer', 2, 'encoding', 'text', 'format'],
      },
    ],
    Component: DataLabels,
  },
];
