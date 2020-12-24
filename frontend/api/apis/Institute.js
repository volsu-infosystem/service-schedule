import { ApiClass } from '../ApiClass';

class Institute extends ApiClass {
  institutes() {
    return this.get('');
  }
}

export { Institute };
