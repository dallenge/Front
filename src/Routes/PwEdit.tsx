import React from 'react';
import Modify from '../Components/Modify';
import styled from 'styled-components';
import axios from 'axios';
import CONSTANT_INFO from '../Constant/Constant';
import { useState } from 'react';
import URL from '../Url';
import { useNavigate } from 'react-router-dom';

// const Container = styled.div`
//   text-align: center;
//   justify-content: center;
//   display: inline-block;
//   width: 1200px;
// `;

// const Input = styled.input`
//   padding: 7px;
//   font-size: 20px;
//   margin-top: 40px;
//   text-align: center;
//   border: none;
//   border-bottom: 1px solid rgb(152, 152, 152);
//   &:focus {
//     outline: none;
//   }
// `;

const Button = styled.button`
  border: 1px solid var(--color-sky);
  background: rgba(63, 114, 175, 0.1);
  width: 120px;
  line-height: 40px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(63, 114, 175, 0.3);
  }
`;

const Input = styled.input`
  width: 350px;
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

const InputBox = styled.div`
  width: 450px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function PwEdit() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [nowPassword, setNowPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [pwError, setPwError] = useState<boolean>(false);
  const [checkPwError, setCheckPwError] = useState<boolean>(false);

  const SIGNUP_MESSAGE = CONSTANT_INFO.SIGNUP_MESSAGE;
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length >= 8) {
      setPwError(false);
    } else {
      setPwError(true);
    }
    setNewPassword(e.target.value);
  };

  const onChangeCheckPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || newPassword === e.target.value) {
      setCheckPwError(false);
    } else {
      setCheckPwError(true);
    }
  };
  const changePassword = async () => {
    if (!pwError && !checkPwError && nowPassword && newPassword) {
      const config = {
        method: 'post',
        url: `${URL}/user/${userId}/change?oldPassword=${nowPassword}&newPassword=${newPassword}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios(config)
        .then(() => {
          alert('변경 완료');
          navigate('/');
        })
        .catch((err) => {
          alert(JSON.parse(err.request.response)?.message);
        });
    }
  };
  return (
    <div>
      <Modify active={'password'} />
      {/* <Container>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'rgb(38, 38, 38)' }}>
          본인 확인을 위해 비밀번호를 입력해주세요.
        </div>
        <Input type="password"></Input>
        <div style={{ marginTop: '100px' }}>
          <Button>확인</Button>
        </div>
      </Container> */}
      <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <InputBox>
          <Input
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => {
              setNowPassword(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <Input type="password" placeholder="새 비밀번호" onChange={onChangePw} />
          {pwError && <ValidationView text={SIGNUP_MESSAGE.SHORT_PASSWORD} />}
        </InputBox>
        <InputBox>
          <Input type="password" placeholder="새 비밀번호 확인" onChange={onChangeCheckPw} />
          {checkPwError && <ValidationView text={SIGNUP_MESSAGE.WRONG_PASSWORD} />}
        </InputBox>

        <Button onClick={changePassword}>확인</Button>
      </div>
    </div>
  );
}

const ValidationView = ({ text }: { text: string }) => {
  return (
    <div style={{ marginTop: '4px', marginBottom: '10px' }}>
      <div style={{ padding: '0 14px', fontSize: '13px', color: '#F00001', fontWeight: '600' }}>🔥{text}</div>
    </div>
  );
};
