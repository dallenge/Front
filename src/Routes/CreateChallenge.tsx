import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import URL from '../Url';
import axios from 'axios';

export default function CreateChallenge() {
  const [imgFile, setImgFile] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [view, setView] = useState<any>('');

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setView(reader.result);
      };
    }
  }, [imgFile]);

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const img = (target.files as FileList)[0];

    if (!img) return;
    else {
      setImgFile(img);
    }
  };

  const submitChallenge = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const FormData = require('form-data');
    const data = new FormData();

    const challenge = {
      title: title,
      content: content,
      challengeCategory: '공부',
      challengeLocation: '실내',
      challengeDuration: '10분 이내',
    };

    data.append('requestCreateChallenge', new Blob([JSON.stringify(challenge)], { type: 'application/json' }));
    data.append('challengeImgFile', imgFile);

    const config = {
      method: 'post',
      url: `${URL}/challenge/new`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: data,
    };
    await axios(config)
      .then((res) => {
        alert('등록완료');
        console.log(imgFile);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <div style={{ width: '500px', height: '600px', marginRight: '50px' }}>
        <div
          style={{
            width: '500px',
            height: '300px',
            border: '1px solid black',
            objectFit: 'contain',
            marginBottom: '50px',
          }}
        >
          {view ? <img src={view} style={{ width: '500px', height: '300px' }} /> : null}
        </div>
        <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={uploadImgFile} />
      </div>
      <div style={{ width: '500px', height: '500px', background: 'var(--color-sky)', padding: '30px' }}>
        <form id="createForm" onSubmit={submitChallenge}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ fontWeight: '600' }}>챌린지 명</div>
            <input
              style={{
                width: '350px',
              }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '600' }}>내용</div>
            <textarea
              style={{
                width: '350px',
                height: '300px',
                marginBottom: '30px',
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <button
              style={{
                width: '440px',
                border: 'none',
                background: 'var(--color-blue)',
                color: 'white',
                fontWeight: '600',
                height: '40px',
              }}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
