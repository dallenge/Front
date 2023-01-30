import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modify from '../Components/Modify';
import { AiFillCamera } from 'react-icons/ai';

import '../CSS/ProfileEdit.css';
import axios from 'axios';
import URL from '../Url';

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
  // background: rgba(63, 114, 175, 0.1);
  width: 120px;
  line-height: 40px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
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
  const USERNAME = localStorage.getItem('userName');
  const INFO = '기존 자기소개 들어감';
  const IMGFILE = ''; // 서버에서 받은 기존 이미지 파일이 들어감

  const photoInput = useRef<HTMLInputElement>(null);
  const [userName, setNickname] = useState<string>(`${USERNAME}`);
  const [info, setInfo] = useState<string>(`${INFO}`);
  const [imgFile, setImgFile] = useState<any>(`${IMGFILE}`);
  const [view, setView] = useState<any>('');

  const handleClick = () => {
    if (photoInput.current) photoInput.current.click();
  };

  const saveImgFile = (e: React.ChangeEvent) => {
    if (photoInput.current) {
      if (photoInput.current.files) {
        const file = photoInput.current.files[0];
        setImgFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setView(reader.result);
        };
      }
    }
  };

  const onClickEdit = async () => {
    if (!userName || !info) {
      return alert('입력하지 않은 내용이 있는지 확인해 주세요');
    } else {
      const confirm = window.confirm('입력한 내용으로 프로필을 수정합니다');
      if (confirm) {
        const dataSet = {
          userName: userName,
          password: '12345678', // 테스트 코드
          info: info,
        };

        const formData = new FormData();
        formData.append('requestUpdateUser', new Blob([JSON.stringify(dataSet)], { type: 'application/json' }));
        formData.append('userImgFile', imgFile);

        console.log(imgFile);

        const config = {
          method: 'post',
          url: `${URL}/user/${localStorage.getItem('userId')}`,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: formData,
        };

        // 이미지 파일 없이 post 요청 보내면 500 에러
        await axios(config)
          .then((res) => {
            alert('프로필이 변경되었습니다.');
            localStorage.setItem('userName', userName);
            window.location.reload();
          })
          .catch((err) => console.trace(err));
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
            <Image src={view ? view : `https://cdn-icons-png.flaticon.com/512/4645/4645949.png`}></Image>
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
            <Input onChange={(e) => setNickname(e.target.value)} style={{ width: '300px' }} value={userName}></Input>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <Text style={{ fontSize: '18px' }}>자기소개</Text>
          <Textarea onChange={(e) => setInfo(e.target.value)} value={`${info}`}></Textarea>
        </div>
        <div style={{ marginTop: '80px' }}>
          <Button
            className={userName === USERNAME && info === INFO ? 'disable-edit' : 'able-edit'}
            onClick={onClickEdit}
          >
            수정하기
          </Button>
        </div>
      </Container>
    </div>
  );
}
