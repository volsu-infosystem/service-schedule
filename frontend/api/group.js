import Api from './api';

class Group {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  create(body) {
    return this.api.post(`/group`, body);
  }
}
export default Group;
