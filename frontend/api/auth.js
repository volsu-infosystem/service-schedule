import { api } from './api';

function request(email) {
  return api.post('auth/request', {
    email,
  });
}

function login(email, secretCode) {
  return api.post('auth/login', { email, secretCode });
}

export default { request, login };
