import React from 'react';
import { Form, Checkbox, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_PIE_DATA_LABELS,
  SET_PIE_DATA_LABELS_SIZE,
  SET_PIE_DATA_LABELS_POSITION,
} from '../../constants/pie_data_labels.js';

function DataLabels(props) {
  const { form } = props;
  const [enable, setEnable] = React.useState(false);

  const handleEnable = (checked) => {
    let values = form.getFieldValue([]);
    if (checked) {
      const { encoding, mark } = values.layer[0];
      values.layer.push({
        mark: { type: 'text', fontSize: 12, radius: mark.outerRadius + 10 },
        encoding: {
          theta: { ...encoding.theta, stack: true },
          text: { field: encoding.color.field, type: encoding.color.type },
          color: { ...encoding.color, legend: null },
        },
      });
    } else {
      values.layer.splice(1, 1);
    }
    setEnable(checked);
    form.setFieldsValue(values);
  };

  return (
    <div className="property-container">
      <Checkbox
        onChange={(e) => {
          const checked = e.target.checked;
          handleEnable(checked);
        }}
      >
        Enable
      </Checkbox>
      {enable ? (
        <React.Fragment>
          <Form.Item name={['layer', 1, 'mark', 'fontSize']} label="Size">
            <InputNumber />
          </Form.Item>

          <Form.Item name={['layer', 1, 'mark', 'radius']} label="Position( from center)">
            <InputNumber />
          </Form.Item>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default DataLabels;
