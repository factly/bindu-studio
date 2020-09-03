import React from 'react';
import { Input, Row, Col, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getValueFromNestedPath } from '../../utils/index.js';

import {
  SET_TITLE,
  SET_WIDTH,
  SET_HEIGHT,
  SET_BACKGROUND,
} from '../../constants/chart_properties.js';

import { SET_CHART_THEME } from '../../constants/chart';
const { Option } = Select;

function Dimensions(props) {
  const { spec, config } = useSelector((state) => {
    return { spec: state.chart.spec, config: state.chart.config };
  });

  const titleObj = props.properties.find((d) => d.prop === 'title');
  const backgroundObj = props.properties.find((d) => d.prop === 'background');

  const title = getValueFromNestedPath(spec, titleObj.path);
  const background = getValueFromNestedPath(spec, backgroundObj.path);

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
            placeholder="title"
            type="text"
            onChange={(e) =>
              dispatch({
                type: SET_TITLE,
                payload: { value: e.target.value, path: titleObj.path },
                chart: 'shared',
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Background</label>
        </Col>
        <Col span={12}>
          <Input
            value={background}
            type="color"
            onChange={(e) =>
              dispatch({
                type: SET_BACKGROUND,
                payload: { value: e.target.value, path: backgroundObj.path },
                chart: 'shared',
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span={12}>
          <label htmlFor="">Theme</label>
        </Col>
        <Col span={12}>
          <Select
            value={config}
            onChange={(value) =>
              dispatch({
                type: SET_CHART_THEME,
                value: value,
              })
            }
          >
            <Option value="dark">dark</Option>
            <Option value="excel">excel</Option>
            <Option value="fivethirtyeight">fivethirtyeight</Option>
            <Option value="ggplot2">ggplot2</Option>
            <Option value="latimes">latimes</Option>
            <Option value="quartz">quartz</Option>
            <Option value="vox">vox</Option>
            <Option value="urbaninstitute">urbaninstitute</Option>
            <Option value="googlecharts">googlecharts</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default Dimensions;
