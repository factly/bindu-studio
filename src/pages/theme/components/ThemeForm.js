import React from 'react';
import { Button, Form, Input, Space, Select } from 'antd';
import { maker, checker } from '../../../utils/slug';
import ThemeEditor from './ThemeEditor';

import Categories from '../../../components/categories';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 14,
  },
};

const jsonChecker = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const ThemeForm = ({ onSubmit, data = {}, onChange, onModeChange }) => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onTitleChange = (string) => {
    form.setFieldsValue({
      slug: maker(string),
    });
  };

  const onFinish = (values) => {
    const { categories, spec, properties, ...rest } = values;
    onSubmit({
      ...rest,
      spec: JSON.parse(spec),
      properties: JSON.parse(properties),
      category_id: categories,
    });
    onReset();
  };

  return (
    <Form
      {...layout}
      form={form}
      initialValues={{
        ...data,
        config: data?.config
          ? JSON.stringify(data.config)
          : JSON.stringify({
              background: '#333',
              title: { color: '#fff', subtitleColor: '#fff' },
              style: { 'guide-label': { fill: '#fff' }, 'guide-title': { fill: '#fff' } },
              axis: { domainColor: '#fff', gridColor: '#888', tickColor: '#fff' },
            }),
      }}
      onValuesChange={onChange}
      name="create-chart"
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Config Name"
        rules={[
          {
            required: true,
            message: 'Please enter config name!',
          },
          { min: 3, message: 'Name must be minimum 3 characters.' },
          { max: 50, message: 'Name must be maximum 50 characters.' },
        ]}
      >
        <Input onChange={(e) => onTitleChange(e.target.value)} />
      </Form.Item>
      {/* <Form.Item
        name="slug"
        label="Slug"
        rules={[
          {
            required: true,
            message: 'Please input the slug!',
          },
          {
            pattern: checker,
            message: 'Please enter valid slug!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Categories form={form} required label="Category" /> */}
      <Form.Item
        name="config"
        label="Config"
        rules={[
          {
            required: true,
            message: 'Please add Config!',
          },
        ]}
      >
        <ThemeEditor />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ThemeForm;
