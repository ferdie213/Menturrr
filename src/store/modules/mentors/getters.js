export default {
  mentors(state) {
    return state.mentors;
  },
  hasMentors(state) {
    return state.mentors && state.mentors.length > 0;
  },
  isMentor(_, getters, _2, rootGetters) {
    const mentors = getters.mentors;
    const userId = rootGetters.userId;
    return mentors.some(mentor => mentor.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};