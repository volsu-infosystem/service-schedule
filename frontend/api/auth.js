import { api } from './api';

function request(params) {
  return api.post('request', params);
}

function login(params) {
  return api.post('login', params);
}

export default { request, login };
