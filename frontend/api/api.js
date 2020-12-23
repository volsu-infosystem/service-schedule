import { Institute } from './apis/Institute';

export class Api {
  constructor(http) {
    this.institute = new Institute(http);
  }
}
