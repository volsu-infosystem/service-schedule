import Api from './api';

class Schedule {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }
}
export default Schedule;
