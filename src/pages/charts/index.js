import React, { useState } from 'react';
import Display from './display.js';
import ChartOption, { DataComponent } from './options.js';
import DataViewer from './data_viewer.js';
import './index.css';
import { saveChart } from '../../actions/chart';
import SplitPane from 'react-split-pane';
import ChartMeta from './chart_meta';
import { useDispatch, useSelector } from 'react-redux';

import { message, Card, Tooltip, Button, Input } from 'antd';
import { SaveOutlined, EditOutlined, DatabaseOutlined, AreaChartOutlined } from '@ant-design/icons';

import { SET_CHART_NAME } from '../../constants/chart';

const IconSize = 20;

function TitleComponent() {
  const dispatch = useDispatch();
  const chartName = useSelector((state) => state.chart.chartName);
  const [isChartNameEditable, toggleChartNameEditable] = useState(false);
  if (isChartNameEditable) {
    return (
      <div className="chart-name-editable-container">
        <Input
          onPressEnter={() => toggleChartNameEditable(false)}
          value={chartName}
          onChange={(e) => dispatch({ type: SET_CHART_NAME, value: e.target.value })}
        />{' '}
        <Button
          style={{ padding: '4px 0px' }}
          size="medium"
          onClick={() => toggleChartNameEditable(false)}
          type="primary"
        >
          Save
        </Button>{' '}
      </div>
    );
  } else {
    return (
      <div className="chart-name-container">
        <label className="chart-name">{chartName}</label>
        <EditOutlined
          style={{ fontSize: IconSize }}
          onClick={() => toggleChartNameEditable(true)}
        />
      </div>
    );
  }
}

function Chart() {
  const splitContainer = React.useRef(null);

  const { chartName, spec, mode, config, displaySavedSuccessMessage } = useSelector((state) => {
    return {
      chartName: state.chart.chartName,
      spec: state.chart.spec,
      mode: state.chart.mode,
      config: state.chart.config,
      displaySavedSuccessMessage: state.chart.displaySavedSuccessMessage,
    };
  });

  if (displaySavedSuccessMessage) {
    message.info('Chart Successfully Saved', 3, () => {
      dispatch({
        type: 'DISPLAY_CHART_SUCCESS',
        payload: {
          value: false,
        },
      });
    });
  }

  const dispatch = useDispatch();

  const [isDataView, setDataView] = useState(false);

  const actions = [
    {
      name: 'Save',
      Icon: SaveOutlined,
      onClick: () => {
        dispatch(
          saveChart({
            category_ids: [],
            config: spec,
            data_url: '',
            description: 'string',
            featured_medium_id: 0,
            published_date: new Date().toISOString(),
            slug: 'string',
            status: 'published',
            tag_ids: [],
            theme_id: 2,
            title: chartName,
          }),
        );
      },
    },
    {
      name: isDataView ? 'Chart' : 'Data',
      Icon: isDataView ? AreaChartOutlined : DatabaseOutlined,
      onClick: () => setDataView(!isDataView),
    },
  ];

  const actionsList = (
    <div className="extra-actions-container">
      <ul>
        {actions.map((item) => (
          <li key={item.name} onClick={item.onClick}>
            <Tooltip title={item.name}>{<item.Icon style={{ fontSize: IconSize }} />}</Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );

  let SplitView;
  if (isDataView) {
    let columns = [];
    let data = [];
    let headerRow = {};

    if (spec && spec.data && spec.data.values) {
      data = spec.data.values;
      columns = Object.keys(spec.data.values[0]).map((d) => {
        headerRow[d] = d;
        return {
          title: d,
          dataIndex: d,
        };
      });
    }

    const { width, height } = splitContainer.current.pane1.getBoundingClientRect();

    SplitView = (
      <SplitPane
        ref={splitContainer}
        pane1Style={{ width: '70%' }}
        style={{ height: 'calc(100% - 48px)' }}
        split="vertical"
      >
        <DataViewer
          columns={columns}
          dataSource={data}
          scroll={{
            y: height - 55,
            x: width,
          }}
        />
        <SplitPane pane1Style={{ height: '50%', height: 'inherit' }} split="horizontal">
          <DataComponent />
          <Display spec={spec} mode={mode} config={config} />
        </SplitPane>
      </SplitPane>
    );
  } else {
    SplitView = (
      <SplitPane
        ref={splitContainer}
        pane1Style={{ width: '70%', height: 'inherit' }}
        style={{ height: 'calc(100% - 48px)' }}
        split="vertical"
      >
        <Display spec={spec} mode={mode} config={config} />
        <SplitPane pane1Style={{ height: '70%' }} split="horizontal">
          <ChartOption />
          <div className="extra-options" style={{ padding: '12px' }}>
            <ChartMeta />
          </div>
        </SplitPane>
      </SplitPane>
    );
  }

  return (
    <Card
      title={<TitleComponent />}
      extra={actionsList}
      bodyStyle={{ height: 'calc(100vh - 172px)', position: 'relative' }}
    >
      {SplitView}
    </Card>
  );
}

export default Chart;
