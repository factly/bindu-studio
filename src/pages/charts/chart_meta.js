import React, { useEffect } from 'react';
import { Input, Form, Mentions, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTags, getCategories } from '../../actions/chart';

const MentionOption = Mentions.Option;
const SelectOption = Select.Option;
function ChartMeta() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
    dispatch(getCategories());
  }, [dispatch]);

  const { tags, categories } = useSelector((state) => {
    return {
      tags: state.chart.tags.map((d) => d.name),
      categories: state.chart.categories.map((d) => d.name),
    };
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
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
        <Select mode="tags" style={{ width: '100%' }} placeholder="Please select">
          {categories.map((value) => (
            <SelectOption key={value} value={value}>
              {value}
            </SelectOption>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tags"
        name="tags"
        rules={[{ required: true, message: 'Please input your categories' }]}
      >
        <Mentions style={{ width: '100%' }} placeholder=" # to mention tag" prefix={['#']}>
          {tags.map((value) => (
            <MentionOption key={value} value={value}>
              {value}
            </MentionOption>
          ))}
        </Mentions>
      </Form.Item>
    </Form>
  );
}

export default ChartMeta;
