class Api {
  constructor(fetch, session) {
    this.fetch = fetch;
    this.session = session;
    this.baseURL = `/api/`;
  }

  getApiUrl(url) {
    const isBrowser = process.browser;

    const apiUrl = isBrowser
      ? `${this.baseURL}${url}`
      : `http://nest:3005${url}`;

    return apiUrl;
  }

  getFetchMethod() {
    const isBrowser = process.browser;
    return isBrowser ? window.fetch.bind(window) : this.fetch;
  }

  get(url, body) {
    const fetch = this.getFetchMethod();
    return fetch(this.getApiUrl(url), {
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
    const fetch = this.getFetchMethod();
    return fetch(this.getApiUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.token}`,
      },
      body: JSON.stringify(body),
    }).then(response => {
      return response.json();
    });
  }

  put(url, body) {
    const fetch = this.getFetchMethod();
    return fetch(this.getApiUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.token}`,
      },
      body: JSON.stringify(body),
    }).then(response => {
      return response.json();
    });
  }
}

export default Api;
