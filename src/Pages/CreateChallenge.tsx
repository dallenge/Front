import '../CSS/CreateChallenge.css';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import URL from '../Url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BadgeInfoINTERFACE, CreatedChallengeResponseINTERFACE } from '../Interfaces';
import AchieveModal from '../Components/Achievement/Modal';

import { useRecoilState } from 'recoil';
import { isAlertModalAtom, alertMessageAtom } from '../Atoms/modal.atom';
import AlertModal from '../Components/Modal';

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

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [resBadgeInfo, setResBadgeInfo] = useState<BadgeInfoINTERFACE>();

  const [isAlertModal, setIsAlertModal] = useRecoilState<boolean>(isAlertModalAtom);
  const [alertMessage, setAlertMessage] = useRecoilState<string>(alertMessageAtom);

  const onCloseModal = () => {
    setIsOpenModal(false);
    navigate('/challengeList');
  };

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
    data.append('challengeImgFiles', imgFile);
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
      .then(({ data }: { data: CreatedChallengeResponseINTERFACE }) => {
        if (data.badgeInfo) {
          setResBadgeInfo(data.badgeInfo);
          setIsOpenModal(true);
        } else {
          alert('등록완료');
          navigate('/challengeList');
        }
      })
      .catch((err: any) => {
        setAlertMessage(err.response.data.message || '토큰');
        setIsAlertModal(true);
      });
  };
  return (
    <>
      {isAlertModal && <AlertModal content={alertMessage} />}
      {isOpenModal && resBadgeInfo && (
        <AchieveModal
          onClickToggleModal={onCloseModal}
          name={resBadgeInfo.createBadgeName}
          url={resBadgeInfo.badgeImgUrl}
        />
      )}
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
            {view ? <img src={view} alt="" style={{ width: '500px', height: '300px' }} /> : null}
          </div>
          <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={uploadImgFile} />
        </div>
        <div style={{ width: '600px', background: 'var(--color-sky)', padding: '30px' }}>
          <div id="createForm">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ fontWeight: '600' }}>장소</div>
              <SelectBox
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              >
                <option value="" selected>
                  ===선택===
                </option>
                <option value="실내">실내</option>
                <option value="실외">실외</option>
              </SelectBox>
              <div style={{ fontWeight: '600' }}>소요 시간</div>
              <SelectBox
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              >
                <option value="" selected>
                  ===선택===
                </option>
                <option value="10분 이내">10분 이내</option>
                <option value="10분 ~ 30분 이내">10분 ~ 30분</option>
                <option value="30분 ~ 1시간 이내">30분 ~ 1시간</option>
                <option value="1시간 이상">1시간 이상</option>
              </SelectBox>
              <div style={{ fontWeight: '600' }}>카테고리</div>
              <SelectBox
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="" selected>
                  ===선택===
                </option>
                <option value="공부">공부</option>
                <option value="봉사">봉사</option>
                <option value="운동">운동</option>
                <option value="경제">경제</option>
                <option value="건강">건강</option>
              </SelectBox>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ fontWeight: '600' }}>해시태그</div>
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
                  placeholder="해시태그 입력"
                  onChange={onChangeHashtag}
                  onKeyUp={onKeyUp}
                  value={hashtag}
                ></input>
              </div>
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
                  width: '540px',
                  border: 'none',
                  background: 'var(--color-blue)',
                  color: 'white',
                  fontWeight: '600',
                  height: '40px',
                }}
                onClick={submitChallenge}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
