import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isLoggedInAtom } from '../../../Atoms/user.atom';
import AuthApi from '../../../Apis/authApi';

const LoginAuthHandle = () => {
  const [, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInAtom);
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const userName = params.get('userName');
    const userId = params.get('userId');
    const token = params.get('accessToken');
    const errMessage = params.get('message');

    const getUser = async () => {
      try {
        const res = await AuthApi.getUser(userId ?? '');
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('info', res.data.info);
        localStorage.setItem('imageUrl', res.data.imageUrl);
        window.location.replace('/');
      } catch (err) {
        alert(err);
        window.location.replace('/login');
      }
    };

    const doLogin = async () => {
      setIsLoggedIn(true);
      localStorage.setItem('userName', userName ?? '');
      localStorage.setItem('userId', userId ?? '');
      localStorage.setItem('token', token ?? '');
      localStorage.setItem('expire', (Date.now() + 7200000).toString());
      getUser();
    };

    if (userName && userId && token) doLogin();
    else if (errMessage) {
      alert(errMessage);
      window.location.replace('/login');
    }
  }, [setIsLoggedIn]);

  return (
    <>
      <Container></Container>
    </>
  );
};

export default LoginAuthHandle;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
