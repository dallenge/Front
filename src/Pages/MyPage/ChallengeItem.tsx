import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CONSTANT_INFO from '../../Constant/Constant';
import DailyInfo from './DailyInfo';

const IMAGE_URL = CONSTANT_INFO.IMAGE_URL;

const CursorDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const ChallengeBox = styled.div`
  border: 3px solid var(--color-sky);
  background: rgba(219, 226, 239, 0.3);
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
  padding: 0 25px;
  padding-top: 25px;
  padding-bottom: 10px;
  margin: 25px 0;
`;

const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

const TogleImageDown = styled.img`
  width: 22px;
  &:hover {
    cursor: pointer;
  }
`;

const TogleImageUp = styled.img`
  width: 22px;
  transform: rotate(180deg);
  &:hover {
    cursor: pointer;
  }
`;
const ChallengeItem = ({
  id,
  title,
  content,
  status,
  pushChallenge,
  weeklyAchievement,
  getMyChallenge,
}: {
  id: number;
  title: string;
  content: string;
  status: string;
  pushChallenge: any;
  getMyChallenge: any;
  weeklyAchievement: boolean[];
}) => {
  const URL = process.env.REACT_APP_URL;
  const [challengeStatus, setChallengeStatus] = useState<string>(status);
  const [isChecked, setIsChecked] = useState<boolean>(challengeStatus === 'SUCCESS' ? true : false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickCheck = () => {
    let config = {};
    if (challengeStatus === 'SUCCESS') {
      pushChallenge(id, 'delete');
      setIsChecked(false);
      config = {
        method: 'post',
        url: `${URL}/challenge/${id}/pause`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    } else {
      pushChallenge(id, 'add');
      setIsChecked(true);
      config = {
        method: 'post',
        url: `${URL}/challenge/${id}/success`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    }

    axios(config)
      .then(() => {
        if (challengeStatus === 'SUCCESS') {
          setChallengeStatus('PUASE');
        } else {
          setChallengeStatus('SUCCESS');
        }
        getMyChallenge();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsChecked(!isChecked);
  };

  return (
    <div>
      <ChallengeBox>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-block' }}>
            <TitleDiv>{title}</TitleDiv>
            <div style={{ fontSize: '14px', marginTop: '5px', fontWeight: '600' }}>{content}</div>
          </div>
          <CursorDiv onClick={onClickCheck} style={{ display: 'inline-block', marginRight: '20px', marginTop: '8px' }}>
            {isChecked ? (
              <img style={{ width: '50px' }} src={IMAGE_URL.CHECK_YES_URL} />
            ) : (
              <img style={{ width: '50px' }} src={IMAGE_URL.CHECK_NO_URL} />
            )}
          </CursorDiv>
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isOpen ? (
            <TogleImageDown src={IMAGE_URL.TOGLE_IMAGE_URL} />
          ) : (
            <TogleImageUp src={IMAGE_URL.TOGLE_IMAGE_URL} />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen && <DailyInfo weeklyAchievement={weeklyAchievement} />}
        </div>
      </ChallengeBox>
    </div>
  );
};

export default ChallengeItem;
