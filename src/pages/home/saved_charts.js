import React, { useEffect } from 'react';
import { getSavedCharts } from '../../actions/home';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card } from 'antd';

import Display from '../charts/display';

function renderItem(item, index) {
  return (
    <List.Item>
      <Card title={item.title} bodyStyle={{ height: 300 }}>
        <Display spec={item.config} mode={'vega-lite'} />
      </Card>
    </List.Item>
  );
}

function SavedCharts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSavedCharts());
  }, [dispatch]);

  const { charts } = useSelector((state) => {
    return {
      charts: state.home.savedCharts,
    };
  });

  return (
    <div className="container">
      <List
        grid={{ gutter: 16, column: 4 }}
        size="large"
        bordered
        dataSource={charts}
        renderItem={renderItem}
      />
    </div>
  );
}

export default SavedCharts;
