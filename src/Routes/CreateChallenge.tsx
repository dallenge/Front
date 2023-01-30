import React, { HTMLInputTypeAttribute, useState } from 'react';
import styled from 'styled-components';
import URL from '../Url';
import axios, { AxiosHeaders } from 'axios';

export default function CreateChallenge() {
  const [imgFile, setImgFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const img = (target.files as FileList)[0];

    if (!img) return;
    else setImgFile(img);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <div style={{ width: '600px', height: '600px', marginRight: '50px' }}>
        <div style={{ background: `${imgFile}` }}></div>
        <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={uploadImgFile} />
      </div>
      <div style={{ width: '500px', height: '500px', background: 'var(--color-sky)' }}>
        <form id="createForm" onSubmit={submitChallenge}>
          <div>
            <div>챌린지 명</div>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <div>내용</div>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <button>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}
