export const state = () => ({
  isAuthenticated: false,
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.isAuthenticated = true;
    state.user = user;
  },
};
