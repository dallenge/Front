import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: 40px;
  color: var(--color-blue);
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
`;

const Menu = styled.div`
  cursor: pointer;
  margin-left: 40px;
  font-size: 20px;
`;

const onClickLogin = () => {
  window.location.href = '/login';
};

const onClickSignup = () => {
  window.location.href = '/signup/select-account';
};

function Navbar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'cneter',
        borderBottom: '2px solid black',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex' }}>
        <Logo onClick={() => navigate('/')}>
          <div>
            <span style={{ color: 'var(--color-dark-blue)' }}>D</span>allenge
          </div>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
          <Menu>목록</Menu>
          <Menu>등록</Menu>
          <Menu>추천받기</Menu>
          <Menu>베스트리뷰</Menu>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Menu onClick={() => navigate('/login')}>로그인</Menu>
        <Menu onClick={() => navigate('/signup/select-account')}>회원가입</Menu>
      </div>
    </div>
  );
}

export default Navbar;
