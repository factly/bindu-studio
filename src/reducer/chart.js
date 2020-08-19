import sharedReducer from './components/shared/index.js';
import produce from 'immer';

const chartReducer = (state = {}, action) => {
  switch (action.chart) {
    case 'shared':
      return sharedReducer(state, action);
    default:
      switch (action.type) {
        case 'set-config':
          return { ...state, spec: action.value, mode: action.mode || 'vega-lite' };
        case 'set-chart-theme':
          return { ...state, config: action.value };
        case 'set-options':
          return { ...state, showOptions: !state.showOptions };
        case 'set-chart-name':
          return { ...state, chartName: action.value };
        case 'set-data':
          return produce(state, (draftState) => {
            const { rowIndex, columnIndex, value } = action.payload;
            draftState.spec.data.values[rowIndex][columnIndex] = parseInt(value);
          });
        default:
          return state;
      }
  }
};

export default chartReducer;
