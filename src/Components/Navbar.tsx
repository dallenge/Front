import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';

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
  font-size: 18px;
  font-weight: 600;
`;

const SwitchCloseImg = styled.img`
  width: 18px;
  margin-left: 20px;
`;

export default function Navbar() {
  const SPREAD_MENU_SWITCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SPREAD_MENU_SWITCH_IMAGE_URL;
  const navigate = useNavigate();

  const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false);
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
        <Logo onClick={() => navigate('/')}>Dallenge</Logo>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
          <Menu>목록</Menu>
          <Menu>등록</Menu>
          <Menu>추천받기</Menu>
          <Menu>베스트리뷰</Menu>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Menu style={{ marginTop: '3px' }}>
          <img
            style={{ height: '16px', marginRight: '3px', marginTop: '-4px' }}
            src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
          />
          검색
        </Menu>
        <Menu onClick={() => navigate('/login')}>로그인</Menu>
        <Menu onClick={() => navigate('/signup/select-account')}>회원가입</Menu>
        <span style={{ marginLeft: '50px', marginRight: '20px' }} onClick={() => setIsSwitchOpen(!isSwitchOpen)}>
          {isSwitchOpen ? (
            <SwitchCloseImg style={{ transform: 'rotate(180deg)' }} src={SPREAD_MENU_SWITCH_IMAGE_URL} />
          ) : (
            <SwitchCloseImg src={SPREAD_MENU_SWITCH_IMAGE_URL} />
          )}
        </span>
        {isSwitchOpen && <SpreadMenu />}
      </div>
    </div>
  );
}

const SpreadMenuBox = styled.div`
  padding: 15px;
  position: absolute;
  z-index: 99;
  width: 240px;
  height: 250px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  background: rgba(219, 226, 239, 0.3);
  right: 40px;
  top: 110px;
`;

const Layer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 0;
`;

const SpreadDiv = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 80%;
  background: rgb(200, 200, 200);
`;

const SpreadMenu = () => {
  return (
    <SpreadMenuBox>
      <Layer>
        <SpreadDiv>관심있는 챌린지</SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv>내가 시작한 챌린지</SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv>내가 쓴 후기</SpreadDiv>
      </Layer>
      <Layer>
        <Line></Line>
      </Layer>
      <Layer>
        <SpreadDiv>회원정보 수정</SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv>로그아웃</SpreadDiv>
      </Layer>
    </SpreadMenuBox>
  );
};
