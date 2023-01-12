import { useState } from 'react';
import styled from 'styled-components';

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

const SingupDiv = styled.div`
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
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [name, setName] = useState('');

  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [checkPwError, setCheckPwError] = useState(false);

  const onChangeId = (e: any) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) {
      setIdError(false);
    } else {
      setIdError(true);
    }
    setId(e.target.value);
  };

  const onChangePw = (e: any) => {
    if (!e.target.value || e.target.value.length >= 8) {
      setPwError(false);
    } else {
      setPwError(true);
    }
    setPw(e.target.value);
  };

  const onChangeCheckPw = (e: any) => {
    if (!checkPw || pw === checkPw) {
      setCheckPwError(false);
    } else {
      setCheckPwError(true);
    }
    setCheckPw(e.target.value);
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div>
      <div style={{ marginTop: '50px' }}></div>
      <Container>
        <div style={{ fontSize: '28px', lineHeight: '30px', fontWeight: '700' }}>회원가입</div>
        <div style={{ marginTop: '30px' }}>
          <div style={{ float: 'left', fontWeight: '600' }}>이메일(아이디)</div>
          <Input type="text" placeholder="이메일 주소를 입력해주세요" autoSave="off" onChange={onChangeId}></Input>
          {idError && <ValidationView text={'이메일 형식에 맞게 입력해 주세요'} onChange={onChangeId} />}

          <div>
            <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>비밀번호</div>
            <Input type="password" placeholder="비밀번호를 입력해주세요" autoSave="off" onChange={onChangePw}></Input>
            {pwError && <ValidationView text={'비밀번호를 8자 이상 입력해주세요'} />}

            <Input
              type="password"
              placeholder="다시 한 번 비밀번호를 입력해주세요"
              autoSave="off"
              onChange={onChangeCheckPw}
            ></Input>
            {checkPwError && <ValidationView text={'비밀번호가 일치하지 않습니다'} />}
          </div>
          <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>이름(닉네임)</div>
          <Input
            type="text"
            placeholder="델린저들에게 불릴 닉네임을 입력해주세요"
            autoSave="off"
            onChange={onChangeName}
          ></Input>
          <div style={{ marginTop: '30px', fontWeight: '600' }}>모든 내용 입력을 완료하셨나요?</div>
          <SingupDiv style={{ marginTop: '10px' }}>가입하기</SingupDiv>
        </div>
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
