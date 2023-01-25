import React from 'react';
import styled from 'styled-components';
import Modify from '../Components/Modify';

const Container = styled.div`
  text-align: left;
  justify-content: center;
  // margin: auto 0;
  display: inline-block;
  width: 1200px;
`;

const Text = styled.div`
  color: rgb(66, 66, 66);
  font-weight: bold;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  font-size: 15px;
  &:focus {
    transition: all 0.8s ease-in-out;
    background: rgba(63, 114, 175, 0.01);
    outline: 1px solid var(--color-blue);
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

const Textarea = styled.textarea`
  width: 400px;
  min-height: 120px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  margin-top: 8px;
  &:focus-visible {
    outline: 1px solid var(--color-blue);
  }
`;

export default function ProfileEdit() {
  return (
    <div>
      <Modify active={'profile'} />
      <Container>
        <div style={{ marginTop: '50px' }}>
          <Text style={{ fontSize: '18px' }}>아이디(이메일 주소)</Text>
          <Text style={{ color: 'rgb(80, 80, 80)', marginTop: '10px' }}>
            {localStorage.getItem('email')?.toString()}
          </Text>
        </div>
        <div style={{ marginTop: '45px' }}>
          <Text style={{ fontSize: '18px' }}>닉네임</Text>
          <Input value={localStorage.getItem('userName')?.toString()}></Input>
        </div>
        <div style={{ marginTop: '50px' }}>
          <Text style={{ fontSize: '18px' }}>자기소개</Text>
          <Textarea value={'기존 자기소개 들어감'}></Textarea>
        </div>
        <div style={{ marginTop: '80px' }}>
          <Button>수정하기</Button>
        </div>
      </Container>
    </div>
  );
}
