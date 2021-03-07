import Api from './api';

class Schedule {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  insertLessons(scheduleId, body) {
    return this.api.post(`schedule/${scheduleId}/lesson`, body);
  }
}
export default Schedule;
