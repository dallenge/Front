import axios from 'axios';

export const Axios = (type) =>
  axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      'Content-Type': `${type}`,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
