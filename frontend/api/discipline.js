import Api from './api';

class Discipline {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  create(body) {
    return this.api.post(`/discipline`, body);
  }

  update(id, body) {
    return this.api.put(`/discipline/${id}`, body);
  }

  disciplines() {
    return this.api.get(`/discipline`);
  }
}
export default Discipline;
