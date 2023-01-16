import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Progressbar from '../Components/Progressbar';
import CONSTANT_INFO from '../Constant/Constant';

const CHECKBOX_IMAGE_URL = CONSTANT_INFO.CHECKBOX_IMAGE_URL;
const TOGLE_IMAGE_URL = CONSTANT_INFO.TOGLE_IMAGE_URL;

const Container = styled.div`
  text-align: left;
  justify-content: center;
  // margin: auto 0;
  display: inline-block;
  width: 1200px;
`;

const Image = styled.img`
  width: 140px;
  border: 3px solid black;
  border-radius: 70px;
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
  border: 1px solid; black;
`;

interface ChallengeList {
  id: number;
  title: string;
  content: string;
}

export default function Mypage() {
  // ----dummy-------------------------------------
  const myChallengeList: ChallengeList[] = [
    {
      id: 1,
      title: '광합성 하기~',
      content: '하루에 10분씩 햇빛 보기^^!',
    },
    {
      id: 2,
      title: '하루에 한번 강아지 산책시키기',
      content: '적어도 30분씩 산책 다녀오기',
    },
    {
      id: 3,
      title: '매일 프론트엔드 공부하기',
      content: '하루에 6시간씩 공부하기!!',
    },
  ];
  // -------------------------------------------

  const [total, setTotal] = useState(myChallengeList.length);
  const [completed, setCompleted] = useState(0); // 완료한 개수 데이터베이스에서 주고받고....

  const [checkedArr, setCheckedArr] = useState<Array<number>>([]);

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

  return (
    <div style={{ marginTop: '40px' }}>
      <Container>
        <div>
          <div style={{ color: 'var(--color-dark-blue)', fontWeight: 600, fontSize: '30px' }}>마이페이지</div>
        </div>
        <div style={{ marginTop: '50px', display: 'flex' }}>
          {/* 여기에 회원 이미지 넣기!!!!!! */}
          <div style={{ display: 'inline-block' }}>
            <Image src="https://cdn-icons-png.flaticon.com/512/4645/4645949.png"></Image>
          </div>
          <div style={{ display: 'inline-block', height: '140px', padding: '10px 30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: '28px', fontWeight: '600', display: 'inline-block' }}>강성욱 님</div>
              <div style={{ padding: '8px 30px', display: 'inline-block' }}>
                {/* <EditButton>프로필 수정</EditButton> */}
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>아직 자기소개가 없어요!🏃🏻</div>
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
                  id={challenge.id}
                  title={challenge.title}
                  content={challenge.content}
                  pushChallenge={pushChallenge}
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

const ChallengeItem = ({
  id,
  title,
  content,
  pushChallenge,
}: {
  id: number;
  title: string;
  content: string;
  pushChallenge: any;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickCheck = () => {
    if (isChecked) {
      // 체크O 상태인데 체크버튼이 눌렸다면 -> 취소가 되어야 함
      pushChallenge(id, 'delete');
    } else {
      // 체크X 상태인데 체크버튼이 눌렸다면 -> 선택이 되어야 함
      pushChallenge(id, 'add');
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
          <div onClick={onClickCheck} style={{ display: 'inline-block', marginRight: '20px', marginTop: '8px' }}>
            {isChecked ? (
              <img style={{ width: '50px' }} src={CHECKBOX_IMAGE_URL.CHECK_YES_URL} />
            ) : (
              <img style={{ width: '50px' }} src={CHECKBOX_IMAGE_URL.CHECK_NO_URL} />
            )}
          </div>
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(`${id}번 토글 눌림`);
          }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isOpen ? (
            <TogleImageUp src={TOGLE_IMAGE_URL.TOGLE_IMAGE_URL} />
          ) : (
            <TogleImageDown src={TOGLE_IMAGE_URL.TOGLE_IMAGE_URL} />
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