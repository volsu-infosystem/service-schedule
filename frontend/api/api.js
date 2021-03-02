class Api {
  constructor(fetch, session) {
    this.fetch = fetch;
    this.session = session;
    this.baseURL = `${session.baseURL}/api`;
  }

  get(url, body) {
    const isBrowser = process.browser;
    let apiUrl = isBrowser ? `${this.baseURL}${url}` : `http://nest:3005${url}`;
    return this.fetch(apiUrl, {
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
    const isBrowser = process.browser;
    let apiUrl = isBrowser ? `${this.baseURL}${url}` : `http://nest:3005${url}`;
    return this.fetch(apiUrl, {
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
