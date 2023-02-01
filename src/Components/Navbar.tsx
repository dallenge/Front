import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';
import Searchbar from './Searchbar';

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
  &:hover {
    cursor: pointer;
  }
`;

const SwitchCloseImg = styled.img`
  width: 23px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default function Navbar() {
  const SPREAD_MENU_SWITCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SPREAD_MENU_SWITCH_IMAGE_URL;
  const SEARCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SEARCH_IMAGE_URL;
  const navigate = useNavigate();

  const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    if (Date.now() >= Number(localStorage.getItem('expire'))) localStorage.clear();
  });

  interface SetOpenFunc {
    (): void;
  }

  const setOpen: SetOpenFunc = () => {
    // 자식 컴포넌트에게 넘겨줄 함수
    setIsSwitchOpen(!isSwitchOpen);
  };

  const closeBar = () => {
    setIsSwitchOpen(false);
    setIsSearchOpen(false);
  };

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
        <Logo
          onClick={() => {
            navigate('/');
            closeBar();
          }}
        >
          Dallenge
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
          <Menu
            onClick={() => {
              navigate('/challengelist');
              closeBar();
            }}
          >
            목록
          </Menu>
          <Menu
            onClick={() => {
              navigate('/createchallenge');
              closeBar();
            }}
          >
            등록
          </Menu>
          <Menu
            onClick={() => {
              closeBar();
            }}
          >
            추천받기
          </Menu>
          <Menu
            onClick={() => {
              closeBar();
            }}
          >
            베스트리뷰
          </Menu>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Menu style={{ marginTop: '3px' }}>
          <div
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsSwitchOpen(false);
            }}
          >
            <img
              style={{ height: '16px', marginRight: '3px', marginTop: '-4px' }}
              alt="search-img"
              src={SEARCH_IMAGE_URL}
            />
            검색
          </div>
        </Menu>
        {!localStorage.getItem('token') ? (
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <Menu onClick={() => navigate('/login')}>로그인</Menu>
            <Menu onClick={() => navigate('/signup/select-account')}>회원가입</Menu>
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            <span>
              <Menu style={{ marginLeft: '50px', marginRight: '20px' }} onClick={() => navigate('/my-page')}>
                {localStorage.getItem('userName')}님
              </Menu>
            </span>
            {isSwitchOpen ? (
              <SwitchCloseImg
                onClick={() => setIsSwitchOpen(!isSwitchOpen)}
                style={{ transform: 'rotate(180deg)' }}
                src={SPREAD_MENU_SWITCH_IMAGE_URL}
              />
            ) : (
              <SwitchCloseImg
                onClick={() => {
                  setIsSwitchOpen(!isSwitchOpen);
                  setIsSearchOpen(false);
                }}
                src={SPREAD_MENU_SWITCH_IMAGE_URL}
              />
            )}
            {isSwitchOpen && <SpreadMenu setOpen={setOpen} />}
          </div>
        )}
      </div>
      {isSearchOpen ? <Searchbar closeBar={closeBar} /> : null}
    </div>
  );
}

const SpreadMenuBox = styled.div`
  padding: 15px;
  position: absolute;
  z-index: 999;
  width: 240px;
  height: 250px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  background: #ffffff;
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

interface SetOpenFunc {
  (): void;
}

const SpreadMenu = ({ setOpen }: { setOpen: SetOpenFunc }) => {
  const navigate = useNavigate();
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
        <SpreadDiv
          onClick={() => {
            navigate('/my-page/modify/profile-edit');
            setOpen(); // 페이지 이동하면 스프레드 메뉴 닫히도록
          }}
        >
          회원정보 수정
        </SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          로그아웃
        </SpreadDiv>
      </Layer>
    </SpreadMenuBox>
  );
};
