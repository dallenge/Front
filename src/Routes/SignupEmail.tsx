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

  const onChangeId = (e: any) => {
    setId(e.target.value);
  };

  const onChangePw = (e: any) => {
    setPw(e.target.value);
  };

  return (
    <div>
      <div style={{ marginTop: '50px' }}></div>
      <Container>
        <div style={{ fontSize: '28px', lineHeight: '30px', fontWeight: '700' }}>회원가입</div>
        <div style={{ marginTop: '30px' }}>
          <div style={{ float: 'left', fontWeight: '600' }}>이메일(아이디)</div>
          <Input type="text" placeholder="이메일 주소를 입력해주세요" autoSave="off" onChange={onChangeId}></Input>
          <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>비밀번호</div>
          <Input type="password" placeholder="비밀번호를 입력해주세요" autoSave="off" onChange={onChangePw}></Input>
          <Input
            type="password"
            placeholder="다시 한 번 비밀번호를 입력해주세요"
            autoSave="off"
            onChange={onChangePw}
          ></Input>
          <div style={{ marginTop: '20px', float: 'left', fontWeight: '600' }}>이름(닉네임)</div>
          <Input
            type="text"
            placeholder="델린저들에게 불릴 닉네임을 입력해주세요"
            autoSave="off"
            onChange={onChangeId}
          ></Input>
          <div style={{ marginTop: '30px', fontWeight: '600' }}>모든 내용 입력을 완료하셨나요?</div>
          <SingupDiv style={{ marginTop: '10px' }}>가입하기</SingupDiv>
        </div>
      </Container>
    </div>
  );
}
