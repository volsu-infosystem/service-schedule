export class ApiClass {
  constructor(http, controller = '') {
    this.http = http;
    this.controller = controller;
  }
  get(endpoint, params = {}, config = {}) {
    return this.http.get(`/api/${this.controller}/${endpoint}`, {
      params,
      ...config,
    });
  }
  post(endpoint, data = {}, config = {}, params = {}) {
    return this.http.post(`/api/${this.controller}/${endpoint}`, data, {
      params,
      ...config,
    });
  }
  delete(endpoint, params = {}, config = {}) {
    return this.http.delete(`/api/${this.controller}/${endpoint}`, {
      params,
      ...config,
    });
  }
  patch(endpoint, data = {}, params = {}, config = {}) {
    return this.http.patch(`/api/${this.controller}/${endpoint}`, data, {
      params,
      ...config,
    });
  }
}
