import Api from './api';

class Profile {
  constructor(fetch, session) {
    this.api = new Api(fetch, session);
  }

  createProfessor(body) {
    return this.api.post(`/profile/professor`, body);
  }
}
export default Profile;
