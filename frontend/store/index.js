const token = localStorage.getItem('token');

export const state = () => ({
  isAuthenticated: !!token,
  user: {
    token: token || '',
  },
});

export const mutations = {
  setUser(state, user) {
    state.isAuthenticated = true;
    state.user = user;

    localStorage.setItem('token', user.token);
  },
};
