import { Axios } from './@core';

const PATH = '/user';
const JSON_TYPE = 'application/json';

const AuthApi = {
  login(email: string, password: string) {
    return Axios(JSON_TYPE).post(PATH + '/login', JSON.stringify({ email, password }));
  },

  resetPassword(email: string) {
    return Axios(JSON_TYPE).post(PATH + `/resetPassword?email=${email}`);
  },

  signup({ email, password, userName }: { email: string; password: string; userName: string }) {
    return Axios(JSON_TYPE).post(PATH + '/new', JSON.stringify({ email, password, userName }));
  },

  duplicatedEmailConfirm(email: string) {
    return Axios(JSON_TYPE).post(PATH + `/check?email=${email}`);
  },

  changePassword(oldPassword: string, newPassword: string) {
    const USER_ID = localStorage.getItem('userId');
    return Axios(JSON_TYPE).post(PATH + `/${USER_ID}/change`, { oldPassword, newPassword });
  },

  getMyParticipatedChallenge() {
    return Axios().get(PATH + `/inProgress`);
  },

  getUser(userid: string) {
    return Axios().get(PATH + `/${userid}`);
  },

  getMyBookmarkedChallenge() {
    const USER_ID = localStorage.getItem('userId');
    return Axios().get(PATH + `/${USER_ID}/bookmark`);
  },
};

export default AuthApi;
