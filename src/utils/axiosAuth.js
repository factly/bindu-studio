import axios from 'axios';

function createAxiosAuthMiddleware() {
  return ({ getState }) => (next) => (action) => {
    axios.defaults.headers.common['X-Organisation'] = 3;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    return next(action);
  };
}

const axiosAuth = createAxiosAuthMiddleware();

export default axiosAuth;
