import {
  ADD_THEME,
  ADD_THEMES,
  ADD_THEMES_REQUEST,
  SET_THEMES_LOADING,
  RESET_THEMES,
} from '../constants/themes';
import deepEqual from 'deep-equal';

const initialState = {
  req: [],
  details: {},
  loading: true,
};

export default function tagsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_THEMES:
      return {
        ...state,
        req: [],
        details: {},
        loading: true,
      };
    case SET_THEMES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_THEMES_REQUEST:
      return {
        ...state,
        req: state.req
          .filter((value) => !deepEqual(value.query, action.payload.query))
          .concat(action.payload),
      };
    case ADD_THEMES:
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        details: {
          ...state.details,
          ...action.payload.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {}),
        },
      };
    case ADD_THEME:
      return {
        ...state,
        details: {
          ...state.details,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
}
