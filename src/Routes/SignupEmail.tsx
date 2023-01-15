import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';
import URL from '../Url';

const Container = styled.div`
  text-align: center;
  justify-content: center;
  margin: auto 0;
  display: inline-block;
  width: 320px;
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

const SignupButton = styled.button`
  width: 320px;
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

export default function SingupEmail() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');

  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [checkPwError, setCheckPwError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const SIGNUP_MESSAGE = CONSTANT_INFO.SIGNUP_MESSAGE;

  const signUp = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isDisbaled) {
      return alert('입력하지 않은 정보가 있는지 다시 확인해주세요');
    }

    const data = JSON.stringify({
      email: id,
      password: pw,
      userName: name,
    });

    const config = {
      method: 'post',
      url: `${URL}/user/new`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios(config)
      .then((res) => {
        alert('등록 완료');
        navigate('/login');
      })
      .catch((err) => {
        alert('실패');
        console.log(URL);
        console.log(err);
      });
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) {
      setIdError(false);
    } else {
      setIdError(true);
    }
    setId(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length >= 8) {
      setPwError(false);
    } else {
      setPwError(true);
    }
    setPw(e.target.value);
  };

  const onChangeCheckPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || pw === e.target.value) {
      setCheckPwError(false);
    } else {
      setCheckPwError(true);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!e.target.value || (e.target.value.length > 1 && nameRegex.test(e.target.value))) {
      // 닉네임 길이는 2자 이상으로
      setNameError(false);
    } else {
      setNameError(true);
    }
    setName(e.target.value);
  };

  let isDisbaled =
    id.length > 0 && pw.length > 0 && name.length > 0 && !idError && !pwError && !checkPwError && !nameError;

  return (
    <div>
      <div style={{ marginTop: '50px' }}></div>
      <Container>
        <form onSubmit={signUp}>
          <div style={{ fontSize: '28px', lineHeight: '30px', fontWeight: '700' }}>회원가입</div>
          <div style={{ marginTop: '30px' }}>
            <div style={{ float: 'left', fontWeight: '600' }}>이메일(아이디)</div>
            <Input type="text" placeholder={SIGNUP_MESSAGE.PRESS_EMAIL} autoSave="off" onChange={onChangeId}></Input>
            {idError && (
              <ValidationView
                text={SIGNUP_MESSAGE.WRONG_EMAIL}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeCheckPw(e);
                }}
              />
            )}

            <div>
              <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>비밀번호</div>
              <Input
                type="password"
                placeholder={SIGNUP_MESSAGE.PRESS_PASSWORD}
                autoSave="off"
                onChange={onChangePw}
              ></Input>
              {pwError && <ValidationView text={SIGNUP_MESSAGE.SHORT_PASSWORD} />}

              <Input
                type="password"
                placeholder={SIGNUP_MESSAGE.PRESS_PASSWORD_AGAIN}
                autoSave="off"
                onChange={onChangeCheckPw}
              ></Input>
              {checkPwError && <ValidationView text={SIGNUP_MESSAGE.WRONG_PASSWORD} />}
            </div>
            <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>이름(닉네임)</div>
            <Input
              type="text"
              placeholder={SIGNUP_MESSAGE.PRESS_USERNAME}
              autoSave="off"
              onChange={onChangeName}
            ></Input>
            {nameError && <ValidationView text={SIGNUP_MESSAGE.SHORT_USERNAME} />}

            <div style={{ marginTop: '30px', fontWeight: '600' }}>모든 내용 입력을 완료하셨나요?</div>
            <SignupButton type="submit">가입하기</SignupButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

const ValidationView = (props: any) => {
  return (
    <div style={{ marginTop: '4px', marginBottom: '10px' }}>
      <div style={{ padding: '0 14px', fontSize: '13px', color: '#F00001', fontWeight: '600' }}>🔥{props.text}</div>
    </div>
  );
};
