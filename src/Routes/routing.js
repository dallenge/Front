import { createBrowserRouter } from 'react-router-dom';
import GetBadRoot from '../Components/GetBadRoot';
import Layout from '../Components/Layout';
import Achievement from '../Pages/Achievement/Achievement';
import ChallengeList from '../Pages/ChallengeList';
import CreateChallenge from '../Pages/CreateChallenge';
import DetailChallenge from '../Pages/DetailChallenge';
import ProfileEdit from '../Pages/Edit/ProfileEdit';
import ProgressChallengeEdit from '../Pages/Edit/ProgressChallengeEdit';
import PwEdit from '../Pages/Edit/PwEdit';
import Withdrawal from '../Pages/Edit/Withdrawal';
import Home from '../Pages/Home';
import Login from '../Pages/Login/Login';
import Mypage from '../Pages/MyPage/Mypage';
import Recommendation from '../Pages/Recommendation';
import HashTagRecommendation from '../Pages/Recommendation/HashTag';
import RandomRecommendation from '../Pages/Recommendation/Random';
import TestRecommendation from '../Pages/Recommendation/Test';
import SingupEmail from '../Pages/Signup/SignupEmail';
import SignupSelect from '../Pages/Signup/SignupSelect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup/select-account',
        element: <SignupSelect />,
      },
      {
        path: 'signup/user-email',
        element: <SingupEmail />,
      },
      {
        path: 'my-page',
        element: <Mypage />,
      },
      {
        path: 'challengelist/:title/:category',
        element: <ChallengeList />,
      },
      {
        path: 'challengelist/:title',
        element: <ChallengeList />,
      },
      {
        path: 'challengelist//:category',
        element: <ChallengeList />,
      },
      {
        path: 'challengelist',
        element: <ChallengeList />,
      },
      {
        path: 'challenge/:id',
        element: <DetailChallenge />,
      },
      {
        path: 'reatechallenge',
        element: <CreateChallenge />,
      },
      {
        path: 'my-page/modify/profile-edit',
        element: <ProfileEdit />,
      },
      {
        path: 'my-page/modify/password-edit',
        element: <PwEdit />,
      },
      {
        path: 'my-page/modify/withdrawal',
        element: <Withdrawal />,
      },
      {
        path: 'my-page/modify/progress-challenge-edit',
        element: <ProgressChallengeEdit />,
      },
      {
        path: 'get-recommendations',
        element: <Recommendation />,
      },
      {
        path: 'get-recommendations/test',
        element: <TestRecommendation />,
      },
      {
        path: 'get-recommendations/hashtag',
        element: <HashTagRecommendation />,
      },
      {
        path: 'get-recommendations/random',
        element: <RandomRecommendation />,
      },
      {
        path: 'achievement',
        element: <Achievement />,
      },
      {
        path: '*',
        element: <GetBadRoot />,
      },
    ],
  },
]);

export default router;
