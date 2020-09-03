import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index.js';
import thunk from 'redux-thunk';
import axiosAuth from '../utils/axiosAuth';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, axiosAuth)),
);

export default store;
