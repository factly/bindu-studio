import React, { useEffect } from 'react';
import { getOrganiSations } from '../../actions/home';
import { useDispatch } from 'react-redux';
import SavedCharts from './saved_charts';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrganiSations());
  }, [dispatch]);
  return (
    <div className="container">
      <SavedCharts />
    </div>
  );
}

export default Home;
