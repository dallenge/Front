import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Routes/Home';
import Login from './Routes/Login';
import SignupSelect from './Routes/SignupSelect';
import SingupEmail from './Routes/SignupEmail';
import Mypage from './Routes/Mypage';
import ProfileEdit from './Routes/ProfileEdit';
import PostList from './Routes/PostList';
import PwEdit from './Routes/PwEdit';
import Withdrawal from './Routes/Withdrawal';
import ProgressChallengeEdit from './Routes/ProgressChallengeEdit';

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
        <Route path="/postlist" element={<PostList />} />
        <Route path="/my-page/modify/profile-edit" element={<ProfileEdit />} />
        <Route path="/my-page/modify/password-edit" element={<PwEdit />} />
        <Route path="/my-page/modify/withdrawal" element={<Withdrawal />} />
        <Route path="my-page/modify/progress-challenge-edit" element={<ProgressChallengeEdit />} />
      </Routes>
    </div>
  );
}

export default App;
