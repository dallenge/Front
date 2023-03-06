import { Axios } from './core';

const PATH = '/user';
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
    return Axios(JSON_TYPE).post(
      PATH + `/${localStorage.getItem('userId')}/change?oldPassword=${oldPassword}&newPassword=${newPassword}`,
    );
  },
};

export default AuthApi;
