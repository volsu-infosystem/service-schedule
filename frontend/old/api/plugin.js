import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Api } from '@/api/api';

export default function ({ $axios, store, res, error }, inject) {
  $axios.onRequest(config => {
    const user = store.state.global.user;

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  });

  $axios.onResponse(response => {
    const setCookies = response.headers['set-cookie'];

    if (setCookies) {
      res.setHeader('Set-Cookie', setCookies);
    }

    return {
      ...response,
      data: response.data.success,
    };
  });

  const refreshAuthLogic = failedRequest =>
    store.dispatch('global/updateRefreshToken').then(({ token }) => {
      failedRequest.response.config.headers.Authorization = 'Bearer ' + token;

      return Promise.resolve();
    });

  createAuthRefreshInterceptor($axios, refreshAuthLogic, {
    skipWhileRefreshing: false,
  });

  $axios.onError(errorObject => {
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

    if (message) {
      error({ statusCode: code, message });
    }

    return errorObject.response;
  });

  const api = new Api($axios);
  inject('api', api);
}
