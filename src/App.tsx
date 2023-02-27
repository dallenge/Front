import './CSS/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navi/Navbar';
import Home from './Routes/Home';
import Login from './Routes/Login';
import SignupSelect from './Routes/SignupSelect';
import SingupEmail from './Routes/SignupEmail';
import Mypage from './Routes/Mypage';
import ProfileEdit from './Routes/ProfileEdit';
import ChallengeList from './Routes/ChallengeList';
import CreateChallenge from './Routes/CreateChallenge';
import PwEdit from './Routes/PwEdit';
import Withdrawal from './Routes/Withdrawal';
import ProgressChallengeEdit from './Routes/ProgressChallengeEdit';
import DetailChallenge from './Routes/DetailChallenge';
import GetBadRoot from './Components/GetBadRoot';
import Recommendation from './Routes/Recommendation';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/select-account" element={<SignupSelect />} />
        <Route path="/signup/user-email" element={<SingupEmail />} />
        <Route path="/my-page" element={<Mypage />} />
        <Route path="/challengelist/:title/:category" element={<ChallengeList />} />
        <Route path="/challengelist/:title" element={<ChallengeList />} />
        <Route path="/challengelist//:category" element={<ChallengeList />} />
        <Route path="/challengelist" element={<ChallengeList />} />
        <Route path="/challenge/:id" element={<DetailChallenge />} />
        <Route path="/createchallenge" element={<CreateChallenge />} />
        <Route path="/my-page/modify/profile-edit" element={<ProfileEdit />} />
        <Route path="/my-page/modify/password-edit" element={<PwEdit />} />
        <Route path="/my-page/modify/withdrawal" element={<Withdrawal />} />
        <Route path="my-page/modify/progress-challenge-edit" element={<ProgressChallengeEdit />} />
        <Route path="/get-recommendations" element={<Recommendation />} />
        <Route path="*" element={<GetBadRoot />} />
      </Routes>
    </div>
  );
}

export default App;
