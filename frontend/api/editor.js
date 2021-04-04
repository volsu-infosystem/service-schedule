import Api from './api';

class Editor {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  get(institute, semester) {
    return this.api.get(`/schedule/institute/${institute}/${semester}`);
  }

  subgroups(group) {
    return this.api.get(`/group/${group}/subGroups`);
  }

  disciplines() {
    /* TODO Потом получать по айдишники группы */
    return this.api.get(`/discipline`);
  }

  professors(professorId) {
    return this.api.get(`/profile/professor/discipline/${professorId}`);
  }

  rooms() {
    return this.api.get(`/room`);
  }
}
export default Editor;
