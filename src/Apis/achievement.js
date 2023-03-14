import { Axios } from './@core';

const AchievementApi = {
  getUserBadge() {
    return Axios().get('/user/badges');
  },
};
export default AchievementApi;
