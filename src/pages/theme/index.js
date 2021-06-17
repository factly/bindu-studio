import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Card, Popconfirm, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { getThemes, deleteTheme } from '../../actions/themes';

const { Meta } = Card;
const { Title } = Typography;

function Theme() {
  const dispatch = useDispatch();
  const themes = useSelector((state) => Object.values(state.themes.details));

  useEffect(() => {
    dispatch(getThemes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteTheme(id));
  };

  const actions = (theme) => [
    <Link to={'/themes/' + theme.id + '/edit'}>
      <EditOutlined key="edit" />
    </Link>,
    <Popconfirm
      title="Are you sure to delete this template?"
      onConfirm={() => handleDelete(theme.id)}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined key="ellipsis" />
    </Popconfirm>,
  ];

  return (
    <List
      header={
        <Link to={'/themes/create'}>
          <Button type="primary" icon={<PlusOutlined />} size={'large'}>
            Add new
          </Button>
        </Link>
      }
      dataSource={themes}
      renderItem={(theme) => (
        <List.Item>
          <Card hoverable actions={actions(theme)}>
            <Meta title={theme.name} />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default Theme;
