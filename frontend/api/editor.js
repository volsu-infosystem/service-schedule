import Api from './api';

class Editor {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  get(institute, semester) {
    return this.api.get(`/schedule/institute/${institute}/${semester}`);
  }
}
export default Editor;
