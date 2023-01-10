import React from 'react';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const Container = styled.div`
  text-align: center;
  justify-content: center;
  margin: auto 0;
  display: inline-block;
  width: 400px;
`;

const DivHover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const EmailSignup = styled.div`
color: #ffffff;
font-weight: 600;
border-radius: 6px;
line-height: 50px;
background: var(--color-blue);
&:hover {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: rgba(63, 114, 175, 0.2);
  color: var(--color-blue);
`;

const SingupDiv = styled.div`
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: rgba(63, 114, 175, 0.1);
  }
`;

export default function SignupSelect() {
  const onClickLogin = () => {
    window.location.href = '/login';
  };

  const onClickSignupEmail = () => {
    window.location.href = '/signup/user-email';
  };

  return (
    <div>
      <div style={{ marginTop: '100px' }}></div>
      <Container>
        <div style={{ fontSize: '28px', lineHeight: '40px', fontWeight: '700' }}>함께 델린저가 되고 싶다면🏃🏻‍♂️</div>
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <DivHover
            style={{
              marginTop: '20px',
              background: '#F7E600',
              width: '80%',
              height: '50px',
              borderRadius: '6px',
            }}
          >
            <div style={{ paddingTop: '6px', display: 'flex' }}>
              <RiKakaoTalkFill style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
              <div
                style={{
                  display: 'inline-block',
                  lineHeight: '36px',
                  width: '250px',
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                카카오로 가입하기
              </div>
            </div>
          </DivHover>
        </div>
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: '6px' }}>
          <DivHover
            style={{
              marginTop: '10px',
              background: '#ffffff',
              width: '80%',
              height: '50px',
              borderRadius: '6px',
              border: '1px solid #bcbcbc',
            }}
          >
            <div style={{ paddingTop: '6px', display: 'flex' }}>
              <FcGoogle style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
              <div
                style={{
                  display: 'inline-block',
                  lineHeight: '36px',
                  width: '250px',
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                구글로 가입하기
              </div>
            </div>
          </DivHover>
        </div>
        <div style={{ display: 'inline-block', marginTop: '25px', width: '80%' }}>
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ display: 'inline-block', width: '100%', height: '1px', background: '#E1E1E1' }}></span>
            <span style={{ display: 'inline-block', fontSize: '4px', lineHeight: '1px', padding: '0 5px' }}>OR</span>
            <span style={{ display: 'inline-block', width: '100%', height: '1px', background: '#E1E1E1' }}></span>
          </div>
        </div>
        <div style={{ display: 'inline-block', marginTop: '25px', width: '80%' }}>
          <EmailSignup onClick={onClickSignupEmail}>이메일로 가입하기</EmailSignup>
          <div style={{ marginTop: '30px', fontSize: '13px', fontWeight: '600' }}>이미 델린지 회원이신가요?</div>
          <DivHover
            style={{
              border: '1px solid var(--color-blue)',
              borderRadius: '6px',
              lineHeight: '42px',
              marginTop: '10px',
            }}
          >
            <SingupDiv onClick={onClickLogin}>로그인 하러가기</SingupDiv>
          </DivHover>
        </div>
      </Container>
    </div>
  );
}
