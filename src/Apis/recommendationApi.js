import { Axios } from './core';

const PATH = '/challenge';
const JSON_TYPE = 'application/json';

const RecommendationApi = {
  getTestResult(answer) {
    console.log('axios--> ', { ...answer });
    return Axios().get(PATH + '/question', { params: { ...answer } });
  },

  getRandomResult() {
    return Axios().get(PATH + '/random');
  },

  getHashtagResult() {
    return Axios().get(PATH + '/hashtags');
  },
};

export default RecommendationApi;
