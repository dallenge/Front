import { Axios } from './@core';

const PATH = '/user';
const USER_ID = localStorage.getItem('userId');
const JSON_TYPE = 'application/json';

const AuthApi = {
  login(email, password) {
    return Axios(JSON_TYPE).post(PATH + '/login', JSON.stringify({ email, password }));
  },

  signup({ email, password, userName }) {
    return Axios(JSON_TYPE).post(PATH + '/new', JSON.stringify({ email, password, userName }));
  },

  duplicatedEmailConfirm(email) {
    return Axios(JSON_TYPE).post(PATH + `/check?email=${email}`);
  },

  changePassword(oldPassword, newPassword) {
    return Axios(JSON_TYPE).post(PATH + `/${USER_ID}/change?oldPassword=${oldPassword}&newPassword=${newPassword}`);
  },

  getMyParticipatedChallenge() {
    return Axios().get(PATH + `/inProgress`);
  },

  getMyBookmarkedChallenge() {
    return Axios().get(PATH + `/${USER_ID}/bookmark`);
  },
};

export default AuthApi;
