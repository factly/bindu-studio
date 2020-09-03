import React from 'react';
import { Input, Row, Col, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getValueFromNestedPath } from '../../../utils/index.js';
import { SET_XAXIS_COLUMN, SET_YAXIS_COLUMN } from '../../../constants/chart';

const { Option } = Select;

function AreaChartData(props) {
  const { spec } = useSelector((state) => {
    return {
      spec: state.chart.spec,
    };
  });

  let columns = [];
  if (spec && spec.data && spec.data.values) {
    columns = Object.keys(spec.data.values[0]);
  }

  const xFieldPath = ['layer', 0, 'encoding', 'x', 'field'];
  const xAxisField = getValueFromNestedPath(spec, xFieldPath);

  const yFieldPath = ['layer', 0, 'encoding', 'y', 'field'];
  const yAxisField = getValueFromNestedPath(spec, yFieldPath);
  const dispatch = useDispatch();

  return (
    <div className="property-container">
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">X Axis</label>
        </Col>
        <Col span={12}>
          <Select
            value={xAxisField}
            onChange={(value) =>
              dispatch({
                type: SET_XAXIS_COLUMN,
                payload: { value: value, path: xFieldPath },
                chart: 'shared',
              })
            }
          >
            {columns.map((d, i) => (
              <Option key={i} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Y Axis</label>
        </Col>
        <Col span={12}>
          <Select
            value={yAxisField}
            onChange={(value) =>
              dispatch({
                type: SET_YAXIS_COLUMN,
                payload: { value: value, path: yFieldPath },
                chart: 'shared',
              })
            }
          >
            {columns.map((d, i) => (
              <Option key={i} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default AreaChartData;
