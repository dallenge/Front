import { Axios } from './@core';

const PATH = '/challenge';

const ChallengeApi = {
  getChallengeData(challengeId: number) {
    return Axios().get(PATH + `/${challengeId}`);
  },

  getComments(challengeId: number, size: number, page: number) {
    return Axios().get(`/${challengeId}/comment?size=${size}&page=${page}&sort=time`);
  },
  addBookmark(challengeId: number) {
    return Axios().post(`${challengeId}/bookmark/new`);
  },

  deleteBookmark(bookmarkId: number) {
    const USER_ID = localStorage.getItem('userId');
    return Axios().delete(`/user/${USER_ID}/bookmark/${bookmarkId}`);
  },

  participateChallenge(challengeId: number) {
    return Axios().post(PATH + `/${challengeId}/participate`);
  },

  pauseChallenge(challengeId: number) {
    return Axios().post(PATH + `/${challengeId}/pause`);
  },

  successChallenge(challengeId: number) {
    return Axios().post(PATH + `/${challengeId}/success`);
  },

  getPopularChallenge(size: number) {
    return Axios().get(PATH + `?size=${size}&page=0&sort=popular`);
  },
};

export default ChallengeApi;
