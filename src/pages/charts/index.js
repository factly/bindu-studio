import React, { useState } from 'react';
import Display from './display.js';
import ChartOption, { DataComponent } from './options.js';
import DataViewer from './data_viewer.js';
import './index.css';

import SplitPane from 'react-split-pane';

import { useDispatch, useSelector } from 'react-redux';

import { Card, Tooltip, Button, Input, Form, Mentions } from 'antd';
import {
  SaveOutlined,
  SettingOutlined,
  EditOutlined,
  DatabaseOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
const { Option } = Mentions;

function Chart() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const MOCK_DATA = ['ABC', 'DEF', 'XYZ'];

  const splitContainer = React.useRef(null);

  const { chartName, spec } = useSelector((state) => {
    return {
      chartName: state.chart.chartName,
      spec: state.chart.spec,
    };
  });

  const dispatch = useDispatch();

  const [isDataView, setDataView] = useState(false);
  const [isChartNameEditable, toggleChartNameEditable] = useState(false);
  const actions = [
    {
      name: 'Customize',
      Icon: SettingOutlined,
      onClick: () => dispatch({ type: 'set-options' }),
    },
    {
      name: 'Save',
      Icon: SaveOutlined,
    },
    {
      name: isDataView ? 'Chart' : 'Data',
      Icon: isDataView ? AreaChartOutlined : DatabaseOutlined,
      onClick: () => setDataView(!isDataView),
    },
  ];

  const IconSize = 20;

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
  let titleComponent;
  if (isChartNameEditable) {
    titleComponent = (
      <div className="chart-name-editable-container">
        <Input
          onPressEnter={() => toggleChartNameEditable(false)}
          value={chartName}
          onChange={(e) => dispatch({ type: 'set-chart-name', value: e.target.value })}
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
    titleComponent = (
      <div className="chart-name-container">
        <label className="chart-name">{chartName}</label>
        <EditOutlined
          style={{ fontSize: IconSize }}
          onClick={() => toggleChartNameEditable(true)}
        />
      </div>
    );
  }

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
        <SplitPane pane1Style={{ height: '50%' }} split="horizontal">
          <DataComponent />
          <Display />
        </SplitPane>
      </SplitPane>
    );
  } else {
    SplitView = (
      <SplitPane
        ref={splitContainer}
        pane1Style={{ width: '70%' }}
        style={{ height: 'calc(100% - 48px)' }}
        split="vertical"
      >
        <Display />
        <SplitPane pane1Style={{ height: '70%' }} split="horizontal">
          <ChartOption />
          <div className="extra-options" style={{ padding: '12px' }}>
            <Form {...layout} name="basic" initialValues={{ remember: true }} labelAlign="left">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input chart description' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Categories"
                name="categories"
                rules={[{ required: true, message: 'Please input your categories' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tags"
                name="tags"
                rules={[{ required: true, message: 'Please input your categories' }]}
              >
                <Mentions style={{ width: '100%' }} placeholder=" # to mention tag" prefix={['#']}>
                  {MOCK_DATA.map((value) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Mentions>
              </Form.Item>
            </Form>
          </div>
        </SplitPane>
      </SplitPane>
    );
  }

  return (
    <Card
      title={titleComponent}
      extra={actionsList}
      bodyStyle={{ height: 'calc(100vh - 172px)', position: 'relative' }}
    >
      {SplitView}
    </Card>
  );
}

export default Chart;
