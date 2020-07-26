import React from 'react';
import { Input, Select, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getValueFromNestedPath } from '../../utils/index.js';

import {
  SET_YAXIS_TITLE,
  SET_YAXIS_POSITION,
  SET_YAXIS_LABEL_FORMAT,
  SET_YAXIS_LABEL_COLOR,
} from '../../constants/y_axis.js';
const { Option } = Select;

function YAxis(props) {
  const spec = useSelector((state) => state.chart.spec);
  const titleObj = props.properties.find((d) => d.prop === 'title');
  const title = getValueFromNestedPath(spec, titleObj.path);

  const orientObj = props.properties.find((d) => d.prop === 'orient');
  const orient = getValueFromNestedPath(spec, orientObj.path);

  const formatObj = props.properties.find((d) => d.prop === 'format');
  const format = getValueFromNestedPath(spec, formatObj.path);

  const labelColorObj = props.properties.find((d) => d.prop === 'label_color');
  const labelColor = getValueFromNestedPath(spec, labelColorObj.path);

  const dispatch = useDispatch();

  return (
    <div className="property-container">
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Title</label>
        </Col>
        <Col span={12}>
          <Input
            value={title}
            placeholder="Title"
            type="text"
            onChange={(e) =>
              dispatch({
                type: SET_YAXIS_TITLE,
                payload: { value: e.target.value, path: titleObj.path },
                chart: 'shared',
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Position</label>
        </Col>
        <Col span={12}>
          <Select
            value={orient}
            onChange={(value) =>
              dispatch({
                type: SET_YAXIS_POSITION,
                payload: { value: value, path: orientObj.path },
                chart: 'shared',
              })
            }
          >
            <Option value="left">Left</Option>
            <Option value="right">Right</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Label Format</label>
        </Col>
        <Col span={12}>
          <Input
            value={format}
            placeholder="Label Format"
            type="text"
            onChange={(e) =>
              dispatch({
                type: SET_YAXIS_LABEL_FORMAT,
                payload: { value: e.target.value, path: formatObj.path },
                chart: 'shared',
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Label Color</label>
        </Col>
        <Col span={12}>
          <Input
            value={labelColor}
            placeholder="Label Color"
            type="color"
            onChange={(e) =>
              dispatch({
                type: SET_YAXIS_LABEL_COLOR,
                payload: { value: e.target.value, path: labelColorObj.path },
                chart: 'shared',
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
}

export default YAxis;