import { Institute } from './apis/Institute';
import { Auth } from './apis/Auth';

export class Api {
  constructor(http) {
    this.institute = new Institute(http, 'institute');
    this.auth = new Auth(http, 'auth');
  }
}
