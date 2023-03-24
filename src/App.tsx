import './CSS/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navi/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import SignupSelect from './Pages/Signup/SignupSelect';
import SingupEmail from './Pages/Signup/SignupEmail';
import Mypage from './Pages/MyPage/Mypage';
import ProfileEdit from './Pages/Edit/ProfileEdit';
import ChallengeList from './Pages/ChallengeList';
import CreateChallenge from './Pages/CreateChallenge';
import PwEdit from './Pages/Edit/PwEdit';
import Withdrawal from './Pages/Edit/Withdrawal';
import ProgressChallengeEdit from './Pages/Edit/ProgressChallengeEdit';
import DetailChallenge from './Pages/DetailChallenge';
import GetBadRoot from './Components/GetBadRoot';
import Recommendation from './Pages/Recommendation';
import TestRecommendation from './Pages/Recommendation/Test';
import HashTagRecommendation from './Pages/Recommendation/HashTag';
import RandomRecommendation from './Pages/Recommendation/Random';
import Achievement from './Pages/Achievement/Achievement';
import Layout from './Components/Layout';
import BookMarkList from './Pages/BookMarkList';
import FindPw from './Pages/Login/FindPw';
import CommentList from './Pages/CommentList';

function App() {
  return (
    <Layout>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/select-account" element={<SignupSelect />} />
          <Route path="/signup/user-email" element={<SingupEmail />} />
          <Route path="/my-page" element={<Mypage />} />
          <Route path="/challengelist/:title/:category" element={<ChallengeList />} />
          <Route path="/challengelist/:title" element={<ChallengeList />} />
          <Route path="/challengelist//:category" element={<ChallengeList />} />
          <Route path="/challengelist///:hashtag" element={<ChallengeList />} />
          <Route path="/challengelist" element={<ChallengeList />} />
          <Route path="/challenge/:id" element={<DetailChallenge />} />
          <Route path="/createchallenge" element={<CreateChallenge />} />
          <Route path="/my-page/modify/profile-edit" element={<ProfileEdit />} />
          <Route path="/bookmark" element={<BookMarkList />} />
          <Route path="/comment" element={<CommentList />} />
          <Route path="/my-page/modify/password-edit" element={<PwEdit />} />
          <Route path="/my-page/modify/withdrawal" element={<Withdrawal />} />
          <Route path="my-page/modify/progress-challenge-edit" element={<ProgressChallengeEdit />} />
          <Route path="/get-recommendations" element={<Recommendation />} />
          <Route path="/get-recommendations/test" element={<TestRecommendation />} />
          <Route path="/get-recommendations/hashtag" element={<HashTagRecommendation />} />
          <Route path="/get-recommendations/random" element={<RandomRecommendation />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/login/find-password" element={<FindPw />} />
          <Route path="*" element={<GetBadRoot />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
