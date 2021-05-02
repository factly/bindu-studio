import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { maker, checker } from '../../../utils/slug';
import ReactJson from 'react-json-view';

import MediaSelector from '../../../components/MediaSelector';

import Categories from '../../../components/categories';

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

const JSONEditor = ({ value, onChange }) => {
  return (
    <ReactJson
      src={value}
      onEdit={({ updated_src }) => onChange(updated_src)}
      onDelete={() => {}}
      onAdd={() => {}}
    />
  );
};

const jsonChecker = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const TemplateForm = ({ onSubmit, data = {}, onChange }) => {
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
      initialValues={{ ...data }}
      onValuesChange={onChange}
      name="create-chart"
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Chart Name"
        rules={[
          {
            required: true,
            message: 'Please enter chart name!',
          },
          { min: 3, message: 'Name must be minimum 3 characters.' },
          { max: 50, message: 'Name must be maximum 50 characters.' },
        ]}
      >
        <Input onChange={(e) => onTitleChange(e.target.value)} />
      </Form.Item>
      <Form.Item
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
      <Categories form={form} required label="Category" />
      <Form.Item
        name="spec"
        label="Spec"
        rules={[
          {
            required: true,
            message: 'Please add spec!',
          },
          {
            pattern: jsonChecker,
            message: 'Please enter valid json object!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="properties"
        label="Properties"
        rules={[
          {
            required: true,
            message: 'Please add properties!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Featured Image" name="medium_id">
        <MediaSelector />
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

export default TemplateForm;
