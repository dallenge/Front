import { Axios } from './@core';

const PATH = '/challenge';

const RecommendationApi = {
  getTestResult(answer: {
    challengeCategoryIndex: number;
    challengeDurationIndex: number;
    challengeLocationIndex: number;
  }) {
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
