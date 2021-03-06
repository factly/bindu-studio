import React from 'react';
import { Button, Form, Select, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories, addCategory } from '../actions/categories';

function Categories({ required, multiple, label = '' }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = React.useState('');
  const categories = useSelector(({ categories }) => Object.values(categories.details));

  React.useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = () => {
    if (!searchText.trim()) return;
    dispatch(addCategory({ name: searchText }))
      .then(() => {
        setSearchText('');
        dispatch(getCategories());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let rules = [];
  if (required) {
    rules = [
      {
        required: true,
        message: 'Please select a category!',
      },
    ];
  }

  return (
    <Form.Item label={label} name={'categories'} rules={rules}>
      <Select
        showSearch
        mode={multiple ? 'multiple' : ''}
        placeholder="select categories"
        type="text"
        onSelect={() => setSearchText('')}
        onSearch={setSearchText}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        notFoundContent={
          searchText.trim() ? (
            <Button
              block
              type="dashed"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={onCreate}
            >
              Create {searchText}
            </Button>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'No categories available. Type something to create new category'}
            />
          )
        }
      >
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default Categories;
