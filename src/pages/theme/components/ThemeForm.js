import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { maker } from '../../../utils/slug';
import ThemeEditor from './ThemeEditor';

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
    const { config, description, name } = values;
    onSubmit({
      config: JSON.parse(config),
      description: description,
      name: name,
    });
    onReset();
  };

  return (
    <Form
      {...layout}
      form={form}
      initialValues={{
        ...data,
        config: data?.config ? JSON.stringify(data.config, null, 2) : '{}',
      }}
      onValuesChange={onChange}
      name="create-chart"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Theme Name"
        rules={[
          {
            required: true,
            message: 'Please enter theme name!',
          },
          { min: 3, message: 'Name must be minimum 3 characters.' },
          { max: 50, message: 'Name must be maximum 50 characters.' },
        ]}
      >
        <Input onChange={(e) => onTitleChange(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Theme Description"
        rules={[
          {
            required: true,
            message: 'Please enter theme description!',
          },
          { min: 3, message: 'Name must be minimum 3 characters.' },
          { max: 50, message: 'Name must be maximum 50 characters.' },
        ]}
      >
        <Input onChange={(e) => onTitleChange(e.target.value)} />
      </Form.Item>
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
