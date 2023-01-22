import React from 'react';
import Modify from '../Components/Modify';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  justify-content: center;
  display: inline-block;
  width: 1200px;
`;

const Input = styled.input`
  padding: 7px;
  font-size: 20px;
  margin-top: 40px;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgb(152, 152, 152);
  &:focus {
    outline: none;
  }
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

export default function PwEdit() {
  return (
    <div>
      <Modify active={'password'} />
      <div style={{ height: '80px' }}></div>
      <Container>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'rgb(38, 38, 38)' }}>
          본인 확인을 위해 비밀번호를 입력해주세요.
        </div>
        <Input type="password"></Input>
        <div style={{ marginTop: '100px' }}>
          <Button>확인</Button>
        </div>
      </Container>
    </div>
  );
}
