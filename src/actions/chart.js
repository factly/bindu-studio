import axios from 'axios';
import {
  API_POST_CHARTS,
  API_GET_TAGS,
  API_GET_CATEGORIES,
  CHART_SAVE_SUCCESS,
  SET_TAGS,
  SET_CATEGORIES,
} from '../constants/chart';

export const getCategories = () => {
  return (dispatch) => {
    return axios
      .get(API_GET_CATEGORIES)
      .then((response) => {
        dispatch(setCategories(response.data));
      })
      .catch((error) => {});
  };
};

export const getTags = () => {
  return (dispatch) => {
    return axios
      .get(API_GET_TAGS)
      .then((response) => {
        dispatch(setTags(response.data));
      })
      .catch((error) => {});
  };
};

export const saveChart = (config) => {
  return (dispatch) => {
    return axios
      .post(API_POST_CHARTS, config)
      .then((response) => {
        dispatch(DISPLAY_CHART_SUCCESS());
      })
      .catch((error) => {});
  };
};

const DISPLAY_CHART_SUCCESS = () => ({
  type: CHART_SAVE_SUCCESS,
  payload: {
    value: true,
  },
});

const setTags = (data) => ({
  type: SET_TAGS,
  payload: {
    tags: data.nodes,
  },
});

export const setCategories = (data) => ({
  type: SET_CATEGORIES,
  payload: {
    categories: data.nodes,
  },
});
