import Modify from '../../Components/Modify';
import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
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

  const getMyParticipate = () => {
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
  };

  const onClickStopChallenge = (id: number) => {
    const confirm = window.confirm('선택한 챌린지를 정말 그만하시겠습니까?');
    if (confirm) {
      const config = {
        method: 'delete',
        url: `${URL}/challenge/${id}/leave`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      axios(config)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getMyParticipate();
  }, [getMyParticipate]);
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', display: 'inline-block' }}>
                    {challenge.challengeTitle}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '15px', display: 'inline-block' }}>{challenge.challengeContent}</div>
                </div>
              </Box>
              <StopBox
                onClick={() => {
                  onClickStopChallenge(challenge.challengeId);
                }}
              >
                그만하기
              </StopBox>
            </div>
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

export default ProgressChallengeEdit;
