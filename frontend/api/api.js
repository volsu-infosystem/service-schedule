import axios from 'axios';

const api = axios.create({
  baseURL: 'http://64.227.74.131/api/',
});

api.interceptors.request.use(config => {
  const user = {};

  if (user.token) {
    config.headers.Authorization = `Bearer 123`;
  }

  return config;
});

api.interceptors.response.use(
  response => {
    const setCookies = response.headers['set-cookie'];

    if (setCookies) {
      res.setHeader('Set-Cookie', setCookies);
    }

    return {
      ...response,
      data: response.data.success,
    };
  },
  errorObject => {
    const code = parseInt(errorObject.response && errorObject.response.status);

    let message = null;
    if (code === 500) {
      message = 'Ошибка сервера';
    }
    if (code === 404) {
      message = 'Страница не найдена';
    }
    if (code === 400) {
      message = 'Ошибка';
    }
    if (code === 500) {
      message = 'Внутреняя ошибка сервера';
    }
    if (code === 403) {
      message = 'Пожалуйста, авторизируйтесь для выполнения данной операции';
    }
    if (code === 401) {
      return Promise.reject(errorObject);
    }

    console.error(errorObject);

    return errorObject.response;
  },
);

export { api };
