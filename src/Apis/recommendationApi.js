import { Axios } from './core';

const PATH = '/challenge';
const JSON_TYPE = 'application/json';

const RecommendationApi = {
  getTestResult(answer) {
    console.log('axios--> ', { ...answer });
    return Axios(JSON_TYPE).get(PATH + '/question', { params: { ...answer } });
  },

  getRandomResult() {
    return Axios().get(PATH + '/random');
  },
};

export default RecommendationApi;
