import { ApiClass } from '../ApiClass';

class Institute extends ApiClass {
  institutes() {
    this.get('institutes');
  }
}

export { Institute };
