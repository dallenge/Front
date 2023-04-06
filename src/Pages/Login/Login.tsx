import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

import AuthApi from '../../Apis/authApi';
import Regex from '../../Constant/Regex';
import { useRecoilState } from 'recoil';
import { isLoggedInAtom } from '../../Atoms/user.atom';

const KAKAO_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;
const GOOGLE_URL = process.env.REACT_APP_GOOGLE_LOGIN_URL;

function Login() {
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const [, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInAtom);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onClickLogin = async () => {
    try {
      const res = await AuthApi.login(getValues('email'), getValues('password'));
      setIsLoggedIn(true);
      localStorage.clear();
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('expire', (Date.now() + 7200000).toString());
      localStorage.setItem('userId', res.data.userId);
      setAlertMessage(false);
    } catch (err: any) {
      setAlertMessage(true);
    } finally {
      try {
        const res = await AuthApi.getUser(localStorage.getItem('userId') ?? '');
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('info', res.data.info);
        localStorage.setItem('imageUrl', res.data.imageUrl);
        window.location.replace('/');
      } catch (err) {
        alert(err);
      }
    }
  };

  const socialLogin = (type: string) => {
    if (type === 'kakao' && KAKAO_URL) window.location.href = KAKAO_URL;
    else if (type === 'google' && GOOGLE_URL) window.location.href = GOOGLE_URL;
  };

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <form onSubmit={handleSubmit(onClickLogin)}>
        <Input
          type="text"
          onFocus={() => setAlertMessage(false)}
          placeholder="아이디를 입력해주세요"
          {...register('email', {
            required: { value: true, message: '🔥 이메일을 입력해주세요' },
            pattern: {
              value: Regex.email,
              message: '🔥 이메일 형식에 맞게 입력해주세요',
            },
          })}
        ></Input>
        {errors.email && <S.P>{errors.email.message}</S.P>}

        <Input
          type="password"
          onFocus={() => setAlertMessage(false)}
          placeholder="비밀번호를 입력해주세요"
          {...register('password', {
            required: { value: true, message: '🔥 비밀번호를 입력해주세요' },
            minLength: { value: 8, message: '🔥 8자 이상 입력해주세요' },
          })}
        ></Input>
        {errors.password && <S.P>{errors.password.message}</S.P>}
        {alertMessage && <S.P>아이디 또는 비밀번호를 다시 확인해주세요</S.P>}

        <S.Button style={{ background: 'var(--color-blue)', color: 'white' }}>로그인</S.Button>
      </form>

      <S.smallText onClick={() => navigate('/login/find-password')}>비밀번호 찾기</S.smallText>

      <S.BtnsWrapper>
        <S.BtnBox background="#F7E600" border={false}>
          <RiKakaoTalkFill style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
          <S.BtnInnerText onClick={() => socialLogin('kakao')}>카카오로 로그인</S.BtnInnerText>
        </S.BtnBox>
        <S.BtnBox background="#ffffff" border={true}>
          <FcGoogle style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
          <S.BtnInnerText onClick={() => socialLogin('google')}>구글로 로그인</S.BtnInnerText>
        </S.BtnBox>
      </S.BtnsWrapper>
      <S.Line />
      <S.Text>아직 델린지 회원이 아니신가요?</S.Text>
      <S.SignupDiv onClick={() => navigate('/signup/select-account')}>델린지 회원가입 하기</S.SignupDiv>
    </S.Container>
  );
}

export default Login;

const Container = styled.div`
  text-align: center;
  display: inline-block;
  width: 320px;
  margin-top: 70px;
  min-height: 80vh;
`;

const smallText = styled.div`
  font-size: 14px;
  float: right;
  display: inline-flex;
  color: var(--color-blue);
  font-weight: 600;
  margin-top: 4px;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  font-size: 15px;
  &:focus {
    outline: 1px solid var(--color-blue);
  }
`;

const BtnsWrapper = styled.div`
  margin-top: 60px;
`;

const BtnBox = styled.div<{ background?: string; border: boolean }>`
  margin-top: 10px;
  background-color: ${({ background }) => background};
  width: 100%;
  height: 50px;
  border-radius: 6px;
  padding-top: 6px;
  display: flex;
  border: ${({ border }) => (border ? '1px solid rgb(190, 190, 190)' : 'none')};
  :hover {
    cursor: pointer;
  }
`;

const BtnInnerText = styled.div`
  display: inline-block;
  line-height: 36px;
  width: 250px;
  font-weight: 600;
  font-size: 15px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  margin-top: 13px;
`;

const Text = styled.div`
  margin-top: 30px;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 1px;
  background-color: #e1e1e1;
`;

const SignupDiv = styled.div`
  border: 1px solid var(--color-blue);
  border-radius: 6px;
  line-height: 42px;
  margin-top: 10px;
  color: var(--color-blue);
  font-weight: 600;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: rgba(63, 114, 175, 0.1);
  }
`;

const P = styled.p`
  color: #f00001;
  font-weight: 600;
  font-size: 13px;
  display: inline-block;
  margin-top: 4px;
`;

const S = { Container, Title, Input, Button, smallText, Text, BtnsWrapper, BtnBox, BtnInnerText, Line, SignupDiv, P };

interface Inputs {
  email: string;
  password: string;
}
