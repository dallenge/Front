import { Axios } from './@core';

const AchievementApi = {
  getAnyBadge() {
    return Axios().get('/badges');
  },

  getUserBadge() {
    return Axios().get('/user/badges');
  },
};
export default AchievementApi;
