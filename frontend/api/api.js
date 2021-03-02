class Api {
  constructor(fetch, session) {
    this.fetch = fetch;
    this.session = session;
    this.baseURL = `${session.baseURL}/api`;
  }

  get(url, body) {
    console.log(`${this.baseURL}${url}`);
    return this.fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.token}`,
      },
      body,
    }).then(response => {
      return response.json();
    });
  }

  post(url, body) {
    return this.fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.token}`,
      },
      body,
    }).then(response => {
      return response.json();
    });
  }
}

export default Api;
