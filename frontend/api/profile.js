import Api from './api';

class Profile {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  professorList(body) {
    return this.api.get(`/profile/professor`, body);
  }

  createProfessor(body) {
    return this.api.post(`/profile/professor`, body);
  }

  updateProfessor(id, body) {
    return this.api.put(`/profile/professor/${id}`, body);
  }
}
export default Profile;
