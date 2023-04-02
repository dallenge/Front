import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT_INFO from '../../Constant/Constant';
import { FlexAlignCSS, FlexBetweenCSS } from '../../CSS/common';
import Searchbar from '../Searchbar';

import SpreadMenu from './Components/Spread';
import { useRecoilState } from 'recoil';
import { isLoggedInAtom } from '../../Atoms/user.atom';

function Navbar() {
  const SPREAD_MENU_SWITCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SPREAD_MENU_SWITCH_IMAGE_URL;
  const SEARCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SEARCH_IMAGE_URL;
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');

  const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(username);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInAtom);

  useEffect(() => {
    if (Date.now() >= Number(localStorage.getItem('expire'))) {
      setIsLoggedIn(false);
      localStorage.clear();
    }
  });
  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
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
    <Container>
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
              isLoggedIn ? navigate('/createchallenge') : navigate('/login');
              closeBar();
            }}
          >
            등록
          </Menu>
          <Menu
            onClick={() => {
              navigate('/get-recommendations');
              closeBar();
            }}
          >
            추천받기
          </Menu>
          <Menu
            onClick={() => {
              navigate('/achievement');
              closeBar();
            }}
          >
            성취
          </Menu>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <Menu>
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
        {!isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <Menu onClick={() => navigate('/login')}>로그인</Menu>
            <Menu onClick={() => navigate('/signup/select-account')}>회원가입</Menu>
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            <span>
              <Menu
                style={{ marginLeft: '50px', marginRight: '20px' }}
                onClick={() => {
                  navigate('/my-page');
                  closeBar();
                }}
              >
                {userName}님
              </Menu>
            </span>
            <SwitchCloseImg
              src={SPREAD_MENU_SWITCH_IMAGE_URL}
              state={isSwitchOpen}
              onClick={() => {
                setIsSwitchOpen((prev) => !prev);
                setIsSearchOpen(false);
              }}
            />
            {isSwitchOpen && <SpreadMenu setOpen={setOpen} />}
          </div>
        )}
      </div>
      {isSearchOpen ? <Searchbar closeBar={closeBar} /> : null}
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  height: 100px;
  ${FlexBetweenCSS}
  align-items: center;
  border-bottom: 2px solid black;
`;

const Logo = styled.div`
  font-size: 40px;
  color: var(--color-blue);
  font-weight: 700;
  ${FlexAlignCSS}
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

const SwitchCloseImg = styled.img<{ state: boolean }>`
  width: 23px;
  margin-left: 20px;
  transform: ${({ state }) => state && 'rotate(180deg)'};
  &:hover {
    cursor: pointer;
  }
`;
