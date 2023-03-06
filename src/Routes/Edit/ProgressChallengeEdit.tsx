import Modify from '../../Components/Modify';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface myParticipateChallgen {
  challengeContent: string;
  challengeId: number;
  challengeStatus: string;
  challengeTitle: string;
}

function ProgressChallengeEdit() {
  const URL = process.env.REACT_APP_URL;

  const [challengeList, setChallengeList] = useState<myParticipateChallgen[]>([]);

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${URL}/user/participate`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config).then((res) => {
      setChallengeList(res.data);
    });
  }, []);
  return (
    <div>
      <Modify active={'challengeEdit'} />
      <div style={{ height: '80px' }}></div>
      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '40px', color: '#f15a69' }}>
        그만하기를 누르시면 마이페이지 챌린지 목록에서 사라지며 모든 기록이 삭제됩니다
      </div>
      <Container>
        {challengeList.map((challenge) => {
          return (
            <ChallengeBox
              id={challenge.challengeId}
              title={challenge.challengeTitle}
              content={challenge.challengeContent}
            />
          );
        })}
      </Container>
    </div>
  );
}

const StopBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-dark-blue);
  color: #ffffff;
  border-radius: 3px;
  width: 120px;
  height: 84px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Box = styled.div`
  display: inline-block;
  text-align: left;
  border: 1px solid var(--color-sky);
  border-radius: 3px;
  width: 50%;
  margin: 0 10px;
  padding: 14px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  text-align: center;
  justify-content: center;
  display: inline-block;
  width: 1200px;
`;

function ChallengeBox({ id, title, content }: { id: number; title: string; content: string }) {
  const onClickStopChallenge = () => {
    const confirm = window.confirm('선택한 챌린지를 정말 그만하시겠습니까?');
    if (confirm) {
      // 진행하고 있는 챌린지 목록에서 삭제
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', display: 'inline-block' }}>{title}</div>
        </div>
        <div>
          <div style={{ fontSize: '15px', display: 'inline-block' }}>{content}</div>
        </div>
      </Box>
      <StopBox onClick={onClickStopChallenge}>그만하기</StopBox>
    </div>
  );
}

export default ProgressChallengeEdit;
