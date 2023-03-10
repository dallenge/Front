import '../CSS/CreateChallenge.css';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import URL from '../Url';
import axios from 'axios';
import { Form, Navigate, useNavigate } from 'react-router-dom';

const SelectBox = styled.select`
  width: 100px;
  margin: 0 10px;
  font-size: 13px;
`;
export default function CreateChallenge() {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [view, setView] = useState<any>('');
  const [category, setCategory] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [hashtag, setHashtag] = useState<string>('');
  const [hashArr, setHashArr] = useState<string[] | []>([]);

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
  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };
  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const hashWrapOuter = document.querySelector('.HashWrapOuter');
      const hashWrapInner = document.createElement('div');
      hashWrapInner.className = 'HashWrapInner';

      hashWrapInner.addEventListener('click', () => {
        hashWrapOuter?.removeChild(hashWrapInner);
        setHashArr(hashArr.filter((hashtag) => hashtag));
      });

      if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
        hashWrapInner.innerHTML = '#' + e.currentTarget.value;
        hashWrapOuter?.insertBefore(hashWrapInner, e.currentTarget);
        setHashArr((hashArr) => [...hashArr, hashtag]);
        setHashtag('');
      } else if (e.key === 'Backspace' && e.currentTarget.value.trim() === '') {
        const hashArr = document.querySelectorAll('.HashWrapInner');
        hashArr[hashArr.length - 1].remove();
      }
    },
    [hashtag, hashArr],
  );

  const submitChallenge = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const FormData = require('form-data');
    const data = new FormData();

    const challenge = {
      title: title,
      content: content,
      challengeCategory: category,
      challengeLocation: location,
      challengeDuration: duration,
    };
    const hashtagObj = {
      content: hashArr,
    };
    data.append('requestCreateChallenge', new Blob([JSON.stringify(challenge)], { type: 'application/json' }));
    data.append('challengeImgFile', imgFile);
    data.append('hashtagDto', new Blob([JSON.stringify(hashtagObj)], { type: 'application/json' }));

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
        alert('????????????');
        navigate('/challengeList');
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
      <div style={{ width: '600px', background: 'var(--color-sky)', padding: '30px' }}>
        <div id="createForm">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ fontWeight: '600' }}>??????</div>
            <SelectBox
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              <option value="" selected>
                ===??????===
              </option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
            </SelectBox>
            <div style={{ fontWeight: '600' }}>?????? ??????</div>
            <SelectBox
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            >
              <option value="" selected>
                ===??????===
              </option>
              <option value="10??? ??????">10??? ??????</option>
              <option value="10??? ~ 30??? ??????">10??? ~ 30???</option>
              <option value="30??? ~ 1?????? ??????">30??? ~ 1??????</option>
              <option value="1?????? ??????">1?????? ??????</option>
            </SelectBox>
            <div style={{ fontWeight: '600' }}>????????????</div>
            <SelectBox
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="" selected>
                ===??????===
              </option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
              <option value="??????">??????</option>
            </SelectBox>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ fontWeight: '600' }}>????????? ???</div>
            <input
              style={{
                width: '350px',
              }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ fontWeight: '600' }}>????????????</div>
            <div
              className="HashWrapOuter"
              style={{
                width: '350px',
                background: 'white',
                border: '1px solid black',
                display: 'flex',
              }}
            >
              <input type="hidden"></input>
              <input
                style={{
                  width: '150px',
                  border: 'none',
                  outline: 'none',
                }}
                placeholder="???????????? ??????"
                onChange={onChangeHashtag}
                onKeyUp={onKeyUp}
                value={hashtag}
              ></input>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: '600' }}>??????</div>
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
                width: '540px',
                border: 'none',
                background: 'var(--color-blue)',
                color: 'white',
                fontWeight: '600',
                height: '40px',
              }}
              onClick={submitChallenge}
            >
              ??????
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
