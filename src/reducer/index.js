import { combineReducers } from 'redux';
import templates from './templates.js';
import chart from './chart.js';
import home from './home.js';

export default combineReducers({
  templates,
  chart,
  home,
});
