import axios from 'axios';
import {
  ADD_THEME,
  ADD_THEMES,
  ADD_THEMES_REQUEST,
  SET_THEMES_LOADING,
  RESET_THEMES,
  THEMES_API,
} from '../constants/themes';
import { addErrorNotification, addSuccessNotification } from './notification';

export const getThemes = (query) => {
  return (dispatch) => {
    dispatch(loadingThemes());
    return axios
      .get(THEMES_API, {
        params: query,
      })
      .then((response) => {
        dispatch(addThemesList(response.data.nodes));
        dispatch(
          addThemesRequest({
            data: response.data.nodes.map((item) => item.id),
            query: query,
            total: response.data.total,
          }),
        );
        dispatch(stopThemesLoading());
      })
      .catch((error) => {
        dispatch(addErrorNotification(error.message));
      });
  };
};

export const getTheme = (id) => {
  return (dispatch) => {
    dispatch(loadingThemes());
    return axios
      .get(THEMES_API + '/' + id)
      .then((response) => {
        dispatch(getThemeByID(response.data));
        dispatch(stopThemesLoading());
      })
      .catch((error) => {
        dispatch(addErrorNotification(error.message));
      });
  };
};

export const addTheme = (data) => {
  return (dispatch) => {
    dispatch(loadingThemes());
    return axios
      .post(THEMES_API, data)
      .then(() => {
        dispatch(resetThemes());
        dispatch(addSuccessNotification('Theme added'));
      })
      .catch((error) => {
        dispatch(addErrorNotification(error.message));
      });
  };
};

export const updateTheme = (data) => {
  return (dispatch) => {
    dispatch(loadingThemes());
    return axios
      .put(THEMES_API + '/' + data.id, data)
      .then((response) => {
        dispatch(getThemeByID(response.data));
        dispatch(stopThemesLoading());
        dispatch(addSuccessNotification('Tag updated'));
      })
      .catch((error) => {
        dispatch(addErrorNotification(error.message));
      });
  };
};

export const deleteTheme = (id) => {
  return (dispatch) => {
    dispatch(loadingThemes());
    return axios
      .delete(THEMES_API + '/' + id)
      .then(() => {
        dispatch(resetThemes());
        dispatch(addSuccessNotification('Theme deleted'));
      })
      .catch((error) => {
        dispatch(addErrorNotification(error.message));
      });
  };
};

export const addThemes = (tags) => {
  return (dispatch) => {
    dispatch(addThemesList(tags));
  };
};

export const loadingThemes = () => ({
  type: SET_THEMES_LOADING,
  payload: true,
});

export const stopThemesLoading = () => ({
  type: SET_THEMES_LOADING,
  payload: false,
});

export const getThemeByID = (data) => ({
  type: ADD_THEME,
  payload: data,
});

export const addThemesList = (data) => ({
  type: ADD_THEMES,
  payload: data,
});

export const addThemesRequest = (data) => ({
  type: ADD_THEMES_REQUEST,
  payload: data,
});

export const resetThemes = () => ({
  type: RESET_THEMES,
});
