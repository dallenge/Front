import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modify from '../Components/Modify';
import { AiFillCamera } from 'react-icons/ai';

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

const Image = styled.img`
  border-radius: 40px;
  width: 80px;
`;

const Hover = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export default function ProfileEdit() {
  const photoInput = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<any>('');

  const handleClick = () => {
    if (photoInput.current) photoInput.current.click();
  };

  const saveImgFile = (e: React.ChangeEvent) => {
    if (photoInput.current) {
      if (photoInput.current.files) {
        const file = photoInput.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
      }
    }
  };

  return (
    <div>
      <Modify active={'profile'} />
      <Container>
        <div style={{ marginTop: '50px' }}>
          <Text style={{ fontSize: '18px' }}>아이디(이메일 주소)</Text>
          <Text style={{ color: 'rgb(80, 80, 80)', marginTop: '10px' }}>{localStorage.getItem('email')}</Text>
        </div>
        <div style={{ marginTop: '45px', display: 'flex' }}>
          <div style={{ display: 'inline-block' }}>
            <Image src={imgFile ? imgFile : `https://cdn-icons-png.flaticon.com/512/4645/4645949.png`}></Image>
            <Hover onClick={handleClick}>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={saveImgFile}
                ref={photoInput}
                style={{ display: 'none' }}
              />
              <AiFillCamera
                size="30"
                style={{ position: 'absolute', marginTop: '50px', marginLeft: '-20px' }}
              ></AiFillCamera>
            </Hover>
          </div>
          <div style={{ display: 'inline-block', marginLeft: '20px' }}>
            <Text style={{ fontSize: '18px' }}>닉네임</Text>
            <Input style={{ width: '300px' }} value={`${localStorage.getItem('userName')}`}></Input>
          </div>
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
