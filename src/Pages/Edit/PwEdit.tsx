import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modify from '../../Components/Modify';
import styled from 'styled-components';

import CONSTANT_INFO from '../../Constant/Constant';

import AuthApi from '../../Apis/authApi';
import { FlexAlignCSS } from '../../CSS/common';

function PwEdit() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState<string>('');
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
    if (!pwError && !checkPwError && oldPassword && newPassword) {
      try {
        await AuthApi.changePassword(oldPassword, newPassword);
        alert('변경 완료');
        navigate('/');
      } catch (err: any) {
        alert(JSON.parse(err.request.response)?.message);
      }
    }
  };
  return (
    <div style={{ marginBottom: '50px' }}>
      <Modify active={'password'} />
      <Wrapper>
        <InputBox>
          <Input
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => {
              setOldPassword(e.target.value);
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
      </Wrapper>
    </div>
  );
}

export default PwEdit;

const ValidationView = ({ text }: { text: string }) => {
  return (
    <div style={{ marginTop: '4px', marginBottom: '10px' }}>
      <div style={{ padding: '0 14px', fontSize: '13px', color: '#F00001', fontWeight: '600' }}>🔥{text}</div>
    </div>
  );
};
const Wrapper = styled.div`
  ${FlexAlignCSS}
  margin: 80px 0;
  flex-direction: column;
`;
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
  flex-direction: column;
  ${FlexAlignCSS}
`;
