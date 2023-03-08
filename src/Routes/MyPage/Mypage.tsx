import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Progressbar from '../../Components/Progressbar';
import CONSTANT_INFO from '../../Constant/Constant';

const IMAGE_URL = CONSTANT_INFO.IMAGE_URL;

const Container = styled.div`
  text-align: left;
  justify-content: center;
  // margin: auto 0;
  display: inline-block;
  width: 1200px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border: 3px solid black;
  border-radius: 50%;
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

const DailyBox = styled.div`
  width: 96%;
  height: 50px;
  border: 1px solid black;
`;

interface ChallengeList {
  challengeId: number;
  challengeTitle: string;
  challengeContent: string;
  challengeStatus: string;
}

export default function Mypage() {
  const URL = process.env.REACT_APP_URL;
  const [myChallengeList, setMyChallengeList] = useState<ChallengeList[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0); // 완료한 개수 데이터베이스에서 주고받고....

  const [checkedArr, setCheckedArr] = useState<Array<number>>([]);

  const getMyChallenge = useCallback(async () => {
    const config = {
      method: 'get',
      url: `${URL}/user/participate`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    await axios(config)
      .then((res) => {
        let countCompleted = 0;
        res.data.map((challenge: ChallengeList) => {
          if (challenge.challengeStatus === 'SUCCESS') {
            countCompleted += 1;
          }
        });
        setCompleted(countCompleted);
        setMyChallengeList(res.data);
        setTotal(res.data.length);
      })
      .catch(() => {});
  }, []);

  const pushChallenge = (id: number, status: string) => {
    let copyArray = [...checkedArr];

    // 자식 컴포넌트에서 체크박스를 체크했을 경우
    if (status === 'add') {
      setCompleted(completed + 1);
      copyArray.push(id);
      setCheckedArr(copyArray);
    } else if (status === 'delete') {
      setCompleted(completed - 1);
      // 자식 컴포넌트에서 체크박스를 해체했을 경우
      copyArray.map((value) => {
        if (value === id) {
          const deleteIdx = copyArray.indexOf(value);
          setCheckedArr(copyArray.splice(deleteIdx, 1));
        }
      });
    }
  };

  useEffect(() => {
    getMyChallenge();
  }, [getMyChallenge]);

  return (
    <div style={{ marginTop: '40px' }}>
      <Container>
        <div>
          <div style={{ color: 'var(--color-dark-blue)', fontWeight: 600, fontSize: '30px' }}>마이페이지</div>
        </div>
        <div style={{ marginTop: '50px', display: 'flex' }}>
          {/* 여기에 회원 이미지 넣기!!!!!! */}
          <div style={{ display: 'inline-block' }}>
            <Image
              src={
                localStorage.getItem('imageUrl')?.split('/')[1] === 'images'
                  ? URL + `${localStorage.getItem('imageUrl')}` ?? ''
                  : localStorage.getItem('imageUrl') ?? ''
              }
            ></Image>
          </div>
          <div style={{ display: 'inline-block', height: '140px', padding: '10px 30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: '28px', fontWeight: '600', display: 'inline-block' }}>
                {localStorage.getItem('userName')} 님
              </div>
              <div style={{ padding: '8px 30px', display: 'inline-block' }}>
                {/* <EditButton>프로필 수정</EditButton> */}
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>{localStorage.getItem('info') ?? '아직 자기소개가 없어요!🏃🏻'}</div>
          </div>
        </div>
        <div style={{ height: '30px' }}></div>
        <div>
          <Progressbar now={completed} total={total} />
        </div>
        <div style={{ marginTop: '15px' }}>
          <div style={{ display: 'inline-block', float: 'right', fontWeight: '600', fontSize: '20px' }}>
            <span>{`오늘은 ${total}개 중에 `}</span>
            <span style={{ color: 'rgb(228, 15, 15)' }}>{`${completed}`}</span>
            <span>개를 완료하셨어요!</span>
          </div>
          <div style={{ height: '30px' }}></div>
          <div>
            {/* ------- 데이터베이스로부터 받은 챌린지 사용하는 부분 -------- */}
            {myChallengeList.map((challenge) => {
              return (
                <ChallengeItem
                  id={challenge.challengeId}
                  title={challenge.challengeTitle}
                  content={challenge.challengeContent}
                  pushChallenge={pushChallenge}
                  status={challenge.challengeStatus}
                />
              );
            })}
          </div>
        </div>
        <div style={{ height: '45px' }}></div>
      </Container>
    </div>
  );
}

const CursorDiv = styled.div`
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
}: {
  id: number;
  title: string;
  content: string;
  status: string;
  pushChallenge: any;
}) => {
  const URL = process.env.REACT_APP_URL;
  const [isChecked, setIsChecked] = useState<boolean>(status === 'SUCCESS' ? true : false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickCheck = () => {
    if (isChecked) {
      // 체크O 상태인데 체크버튼이 눌렸다면 -> 취소가 되어야 함
      pushChallenge(id, 'delete');
    } else {
      const config = {
        method: 'post',
        url: `${URL}/challenge/${id}/success`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      axios(config)
        .then((res) => {
          console.log(res);
          // 체크X 상태인데 체크버튼이 눌렸다면 -> 선택이 되어야 함
          pushChallenge(id, 'add');
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            <TogleImageUp src={IMAGE_URL.TOGLE_IMAGE_URL} />
          ) : (
            <TogleImageDown src={IMAGE_URL.TOGLE_IMAGE_URL} />
          )}
        </div>
      </ChallengeBox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isOpen && <DailyInfo />}</div>
    </div>
  );
};

const DailyInfo = () => {
  return <DailyBox>데일리인포 자리~~~~!!</DailyBox>;
};
