import axios from 'axios';
const version = 'v1';
const getLocalAccessToken = () => {
  const accessToken = window.localStorage.getItem('tokens');
  if (accessToken) {
    return JSON.parse(accessToken).access.token;
  }
  return null;
};
const getLocalRefreshToken = () => {
  const refreshToken = window.localStorage.getItem('tokens');
  if (refreshToken) {
    return JSON.parse(refreshToken).refresh.token;
  }
  return null;
};
const refreshToken = () => {
  return http.post('/auth/refresh-tokens', {
    refreshToken: getLocalRefreshToken(),
  });
};
const http = axios.create({
  baseURL: `http://localhost:5000/${version}`,
  headers: {
    'Content-type': 'application/json',
  },
});
http.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const tokens = rs.data;
          console.log(tokens, 'new token');
          window.localStorage.setItem('tokens', JSON.stringify(tokens));
          http.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${tokens.access.token}`;
          return http(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

const register = (user) => {
  return http.post('/auth/register', user);
};
const getRefreshToken = () => {
  return http.post('/auth/refresh-tokens', {
    refreshToken: getLocalRefreshToken(),
  });
};
const sendVerificationMail = () => {
  return http.post('/auth/send-verification-email');
};
const login = (user) => {
  return http.post('/auth/login', user);
};

const getCurrentUser = () => {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  if (user) {
    return http.get(`/users/${user.id}`);
  } else {
    return Promise.resolve({});
  }
};
export default {
  http,
  register,
  login,
  getRefreshToken,
  sendVerificationMail,
  getCurrentUser,
};
