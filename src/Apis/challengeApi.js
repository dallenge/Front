import { Axios } from './@core';

const PATH = '/challenge';
const USER_ID = localStorage.getItem('userId');

const ChallengeApi = {
  getChallengeData(challengeId) {
    return Axios().get(PATH + `/${challengeId}`);
  },

  getComments(challengeId, size, page) {
    return Axios().get(`/${challengeId}/comment?size=${size}&page=${page}&sort=time`);
  },

  addBookmark(challengeId) {
    return Axios().post(`${challengeId}/bookmark/new`);
  },

  deleteBookmark(bookmarkId) {
    return Axios().delete(`/user/${USER_ID}/bookmark/${bookmarkId}`);
  },

  participateChallenge(challengeId) {
    return Axios().post(PATH + `/${challengeId}/participate`);
  },

  pauseChallenge(challengeId) {
    return Axios().post(PATH + `/${challengeId}/pause`);
  },

  successChallenge(challengeId) {
    return Axios().post(PATH + `/${challengeId}/success`);
  },

  getPopularChallenge(size) {
    return Axios().get(PATH + `?size=${size}&page=0&sort=popular`);
  },
};

export default ChallengeApi;
