import { FcTodoList } from 'react-icons/fc';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: 40px;
  color: var(--color-blue);
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Menu = styled.div`
  cursor: pointer;
  margin-left: 40px;
  font-size: 20px;
`;

function Navbar() {
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
        <Logo>
          <div>Dallenge</div>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
          <Menu>목록</Menu>
          <Menu>등록</Menu>
          <Menu>추천받기</Menu>
          <Menu>베스트리뷰</Menu>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Menu>로그인</Menu>
        <Menu>회원가입</Menu>
      </div>
    </div>
  );
}

export default Navbar;
