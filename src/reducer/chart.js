import sharedReducer from './components/shared/index.js';
import {
  CHART_SAVE_SUCCESS,
  SET_TAGS,
  SET_CATEGORIES,
  SET_CONFIG,
  SET_CHART_THEME,
  SET_CHART_NAME,
} from '../constants/chart';
const initialState = {
  spec: {},
  config: '',
  showOptions: true,
  chartName: 'Untitled',
  tags: [],
  categories: [],
};

const chartReducer = (state = initialState, action) => {
  switch (action.chart) {
    case 'shared':
      return sharedReducer(state, action);
    default:
      switch (action.type) {
        case SET_CONFIG:
          return { ...state, spec: action.value, mode: action.mode || 'vega-lite' };
        case SET_CHART_THEME:
          return { ...state, config: action.value };
        case SET_CHART_NAME:
          return { ...state, chartName: action.value };
        case SET_TAGS:
          return { ...state, tags: action.payload.tags };
        case SET_CATEGORIES:
          return { ...state, categories: action.payload.categories };
        case CHART_SAVE_SUCCESS:
          return { ...state, displaySavedSuccessMessage: action.payload.value };
        default:
          return state;
      }
  }
};

export default chartReducer;
