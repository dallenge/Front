import { useNavigate } from 'react-router-dom';
import CONSTANT_INFO from '../../Constant/Constant';
import S from '../../CSS/Home-style';
import { ChallengeList } from '../../Interfaces';

const IMAGE_URL = CONSTANT_INFO.IMAGE_URL;

interface Props {
  myChallengeList: ChallengeList[];
  onClickCheck: (status: string, id: number) => void;
}

function TodayChallenge({ myChallengeList, onClickCheck }: Props) {
  const navigate = useNavigate();

  return (
    <S.Card background="var(--color-white)" height="68vh">
      <S.TodayWrapper>
        <S.TodayTitle>⭐️ 오늘의 챌린지 ⭐️</S.TodayTitle>
        <S.TodayContainer>
          {myChallengeList.map((challenge) => {
            return (
              <S.ChallengeBox>
                <div style={{ fontSize: '20px' }}>{challenge.challengeTitle}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.DetailDiv onClick={() => navigate(`/challenge/${challenge.challengeId}`)}>상세보기</S.DetailDiv>
                  <S.CursorDiv
                    onClick={() => {
                      onClickCheck(challenge.challengeStatus, challenge.challengeId);
                    }}
                  >
                    {challenge.challengeStatus === 'SUCCESS' ? (
                      <img alt="" style={{ width: '40px' }} src={IMAGE_URL.CHECK_YES_URL} />
                    ) : (
                      <img alt="" style={{ width: '40px' }} src={IMAGE_URL.CHECK_NO_URL} />
                    )}
                  </S.CursorDiv>
                </div>
              </S.ChallengeBox>
            );
          })}
          {myChallengeList[0] ? (
            <S.TodayChallengeBox
              onClick={() => {
                navigate('/my-page');
              }}
            >
              자세히보기
            </S.TodayChallengeBox>
          ) : (
            <S.TodayWrapper>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  marginTop: '80px',
                }}
              >
                챌린지가 없습니다!
              </div>
              <S.TodayChallengeBox
                style={{ marginTop: '10%' }}
                onClick={() => {
                  navigate('/challengelist');
                }}
              >
                챌린지 추가하기
              </S.TodayChallengeBox>
            </S.TodayWrapper>
          )}
        </S.TodayContainer>
      </S.TodayWrapper>
    </S.Card>
  );
}
export default TodayChallenge;
