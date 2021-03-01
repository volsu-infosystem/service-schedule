import { ApiClass } from '../ApiClass';

class Auth extends ApiClass {
  request(params) {
    return this.post('request', params);
  }
  login(params) {
    return this.post('login', params);
  }
}

export { Auth };
