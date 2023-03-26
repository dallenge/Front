import { Axios } from './@core';

const PATH = '/user';
const JSON_TYPE = 'application/json';

const AuthApi = {
  login(email, password) {
    return Axios(JSON_TYPE).post(PATH + '/login', JSON.stringify({ email, password }));
  },

  resetPassword(email) {
    return Axios(JSON_TYPE).post(PATH + `/resetPassword?email=${email}`);
  },

  signup({ email, password, userName }) {
    return Axios(JSON_TYPE).post(PATH + '/new', JSON.stringify({ email, password, userName }));
  },

  duplicatedEmailConfirm(email) {
    return Axios(JSON_TYPE).post(PATH + `/check?email=${email}`);
  },

  changePassword(oldPassword, newPassword) {
    const USER_ID = localStorage.getItem('userId');
    return Axios(JSON_TYPE).post(PATH + `/${USER_ID}/change?oldPassword=${oldPassword}&newPassword=${newPassword}`);
  },

  getMyParticipatedChallenge() {
    return Axios().get(PATH + `/inProgress`);
  },

  getMyBookmarkedChallenge() {
    const USER_ID = localStorage.getItem('userId');
    return Axios().get(PATH + `/${USER_ID}/bookmark`);
  },
};

export default AuthApi;
