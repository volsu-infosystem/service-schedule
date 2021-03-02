import Api from './api';

class Auth {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  request(email) {
    return this.api.post('auth/request', {
      email,
    });
  }

  login(email, secretCode) {
    return this.api.post('auth/login', { email, secretCode });
  }
}
export default Auth;
