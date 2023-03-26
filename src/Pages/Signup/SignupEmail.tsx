import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT_INFO from '../../Constant/Constant';

import { useForm } from 'react-hook-form';
import AuthApi from '../../Apis/authApi';

import Regex from '../../Constant/Regex';
import { FlexCenterCSS, FlexColumnCenterCSS } from '../../CSS/common';

const SIGNUP_MESSAGE = CONSTANT_INFO.SIGNUP_MESSAGE;

function SingupEmail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isDuplicatedEmail, setDuplicatedEmail] = useState<boolean | null>(null);

  useEffect(() => {
    if (watch('email') !== confirmEmail) setDuplicatedEmail(null);
  }, [watch('email')]);

  useEffect(() => {
    if (errors.email) {
      setIsEmailError(true);
      setDuplicatedEmail(null);
    } else {
      setIsEmailError(false);
    }
  }, [errors.email]);

  const onSignUp = async () => {
    if (isDuplicatedEmail === null) return alert('아이디 중복확인을 해주세요');

    try {
      await AuthApi.signup({
        email: watch('email'),
        password: watch('password'),
        userName: watch('nickname'),
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (err) {
      alert('입력한 내용을 다시 확인해 주세요');
    }
  };

  const onClickDupliConfirm = async (e: any) => {
    e.preventDefault();
    try {
      await AuthApi.duplicatedEmailConfirm(watch('email'));
      setConfirmEmail(watch('email'));
      setDuplicatedEmail(false);
    } catch (err: any) {
      if (err.response.data.code === 409) setDuplicatedEmail(true);
    }
  };

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit(onSignUp)}>
        <S.SubTitle>이메일(아이디)</S.SubTitle>
        <S.FlexRow>
          <Input
            type="text"
            placeholder={SIGNUP_MESSAGE.PRESS_EMAIL}
            {...register('email', {
              required: { value: true, message: '🔥 이메일을 입력해주세요' },
              pattern: {
                value: Regex.email,
                message: '🔥 이메일 형식에 맞게 입력해주세요',
              },
            })}
          ></Input>
          <S.DupliButton disabled={isEmailError} onClick={onClickDupliConfirm}>
            중복확인
          </S.DupliButton>
        </S.FlexRow>
        {!isEmailError && (
          <P>
            {isDuplicatedEmail === null
              ? ''
              : isDuplicatedEmail
              ? '🔥 중복된 아이디입니다'
              : '🍀 사용 가능한 아이디입니다'}
          </P>
        )}
        {errors.email && <P>{errors.email.message}</P>}
        <S.SubTitle>비밀번호</S.SubTitle>
        <S.Input
          type="password"
          placeholder={SIGNUP_MESSAGE.PRESS_PASSWORD}
          {...register('password', {
            required: { value: true, message: '🔥 비밀번호를 입력해주세요' },
            minLength: { value: 8, message: '🔥 8자 이상 입력해주세요' },
          })}
        ></S.Input>
        {errors.password && <P> {errors.password.message}</P>}
        <S.SubTitle>비밀번호 확인</S.SubTitle>
        <S.Input
          type="password"
          placeholder={SIGNUP_MESSAGE.PRESS_PASSWORD_AGAIN}
          {...register('password_confirm', {
            required: { value: true, message: '🔥 비밀번호 확인을 입력해주세요' },
            validate: (value: string) => value === watch('password') || '🔥 입력한 비밀번호와 일치하지 않습니다',
          })}
        ></S.Input>
        {errors.password_confirm && <P>{errors.password_confirm.message}</P>}
        <S.SubTitle>이름(닉네임)</S.SubTitle>
        <S.Input
          type="text"
          placeholder={SIGNUP_MESSAGE.PRESS_USERNAME}
          autoSave="off"
          {...register('nickname', {
            required: { value: true, message: '🔥 닉네임을 입력해주세요' },
            pattern: { value: Regex.nickname, message: '🔥 다시 입력하거나 2자 이상 입력해주세요' },
          })}
        ></S.Input>
        {errors.nickname && <P>{errors.nickname.message}</P>}
        <S.SubTitle state={'center'}>모든 내용 입력을 완료하셨나요?</S.SubTitle>
        <SignupButton type="submit">가입하기</SignupButton>
      </S.Form>
    </S.Container>
  );
}

export default SingupEmail;

const Container = styled.div`
  ${FlexColumnCenterCSS}
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const SubTitle = styled.div<{ state?: string }>`
  font-weight: bold;
  margin-top: 15px;
  margin: ${({ state }) => state === 'center' && '40px auto 0 auto'};
`;

const FlexRow = styled.div`
  ${FlexCenterCSS}
  width: 100%;
  height: 42px;
`;

const DupliButton = styled.button`
  border: none;
  width: 26%;
  margin-left: 5px;
  height: 100%;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  font-size: 15px;
  &:focus {
    outline: 1px solid var(--color-blue);
  }
`;

const SignupButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 10px;
  background: var(--color-blue);
  color: #ffffff;
  font-weight: 600;
  line-height: 40px;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: var(--color-dark-blue);
  }
`;

const P = styled.p`
  color: #f00001;
  font-weight: 600;
  font-size: 13px;
  display: inline-block;
  margin-top: 4px;
`;

const S = { Container, Title, SubTitle, Form, FlexRow, DupliButton, Input };

interface Inputs {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}
