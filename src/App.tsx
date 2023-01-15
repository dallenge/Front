import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Routes/Home';
import Login from './Routes/Login';
import SignupSelect from './Routes/SignupSelect';
import SingupEmail from './Routes/SignupEmail';
import Mypage from './Routes/Mypage';

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
      </Routes>
    </div>
  );
}

export default App;
