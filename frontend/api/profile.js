import Api from './api';

class Profile {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  createProfessor(body) {
    return this.api.post(`/profile/professor`, body);
  }

  updateProfessor(id, body) {
    return this.api.put(`/profile/professor/${id}`, body);
  }
}
export default Profile;
