import axios from 'axios';

const API_GET_ORGANISATIONS = '/organisations';
const API_GET_CHARTS = '/charts';

export const getOrganiSations = () => {
  return (dispatch) => {
    return axios
      .get(API_GET_ORGANISATIONS)
      .then((response) => {})
      .catch((error) => {});
  };
};

export const getSavedCharts = () => {
  return (dispatch) => {
    return axios
      .get(API_GET_CHARTS)
      .then((response) => {
        dispatch(SET_SAVED_CHARTS(response.data));
      })
      .catch((error) => {});
  };
};

export const SET_SAVED_CHARTS = (data) => ({
  type: 'SET_SAVED_CHARTS',
  payload: {
    charts: data.nodes,
  },
});
