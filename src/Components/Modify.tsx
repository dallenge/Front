import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: left;
  justify-content: center;
  // margin: auto 0;
  display: inline-block;
  width: 1200px;
`;

const NaviBtn = styled.div`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  margin-right: 30px;
  line-height: 100px;
  &:hover {
    cursor: pointer;
  }
`;

const NaviActive = styled.div`
  display: inline-block;
  font-size: 17px;
  font-weight: bold;
  border-bottom: 3px solid var(--color-blue);
  color: var(--color-blue);
  margin-right: 30px;
  line-height: 100px;
  &:hover {
    cursor: pointer;
  }
`;

export default function Modify({ active }: { active: String }) {
  const navigate = useNavigate();
  // const [active, setActive] = useState('profile'); // profile or password or withdrawal

  return (
    <Container>
      <div style={{ height: '40px' }}></div>
      <div>
        <div style={{ color: 'var(--color-dark-blue)', fontWeight: 600, fontSize: '30px' }}>회원정보 수정</div>
      </div>
      <div>
        <div
          style={{
            borderBottom: '1px solid rgb(209, 209, 209)',
            height: '80px',
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          {active === 'profile' ? (
            <NaviActive>프로필 수정</NaviActive>
          ) : (
            <NaviBtn onClick={() => navigate('/my-page/modify/profile-edit')}>프로필 수정</NaviBtn>
          )}
          {active === 'password' ? (
            <NaviActive>비밀번호 변경</NaviActive>
          ) : (
            <NaviBtn onClick={() => navigate('/my-page/modify/password-edit')}>비밀번호 변경</NaviBtn>
          )}
          {active === 'withdrawal' ? (
            <NaviActive>회원 탈퇴</NaviActive>
          ) : (
            <NaviBtn onClick={() => navigate('/my-page/modify/withdrawal')}>회원 탈퇴</NaviBtn>
          )}
        </div>
      </div>
    </Container>
  );
}
