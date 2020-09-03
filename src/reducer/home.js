const initialState = {
  savedCharts: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SAVED_CHARTS':
      return { ...state, savedCharts: action.payload.charts };
    default:
      return state;
  }
};

export default homeReducer;
