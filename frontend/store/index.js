export const state = () => ({
  isAuthenticated: true,
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.isAuthenticated = true;
    state.user = user;
  },
};
