import Modify from '../../Components/Modify';
import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FlexCenterCSS, FlexRowCenterCSS } from '../../CSS/common';
import AuthApi from '../../Apis/authApi';

import { useRecoilState } from 'recoil';
import { alertMessageAtom, isAlertModalAtom } from '../../Atoms/modal.atom';
import AlertModal from '../../Components/Modal';

interface myParticipateChallgen {
  challengeContent: string;
  challengeId: number;
  challengeStatus: string;
  challengeTitle: string;
}

function ProgressChallengeEdit() {
  const URL = process.env.REACT_APP_URL;

  const [challengeList, setChallengeList] = useState<myParticipateChallgen[]>([]);
  const [isAlertModal, setIsAlertModal] = useRecoilState<boolean>(isAlertModalAtom);
  const [alertMessage, setAlertMessage] = useRecoilState<string>(alertMessageAtom);

  const getMyParticipate = useCallback(async () => {
    try {
      const res = await AuthApi.getMyParticipatedChallenge();
      setChallengeList(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMyParticipate();
  });

  const onClickStopChallenge = (id: number) => {
    if (window.confirm('선택한 챌린지를 정말 그만하시겠습니까?')) {
      const config = {
        method: 'delete',
        url: `${URL}/challenge/${id}/leave`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      axios(config)
        .then((res) => {
          setAlertMessage(res.data.message);
          setIsAlertModal(true);
        })
        .catch((err: any) => {
          setAlertMessage(err.response.data.message || '토큰');
          setIsAlertModal(true);
        });
    }
  };

  return (
    <>
      {isAlertModal && <AlertModal content={alertMessage} />}
      <div style={{ marginBottom: '50px', minHeight: '90vh' }}>
        <Modify active={'challengeEdit'} />
        <div style={{ height: '80px' }}></div>
        <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '40px', color: '#f15a69' }}>
          그만하기를 누르시면 마이페이지 챌린지 목록에서 사라지며 모든 기록이 삭제됩니다
        </div>
        <Container>
          {challengeList.map((challenge) => {
            return (
              <Wrapper>
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
              </Wrapper>
            );
          })}
        </Container>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  ${FlexRowCenterCSS}
`;

const StopBox = styled.div`
  ${FlexCenterCSS}
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
