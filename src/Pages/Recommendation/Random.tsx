import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RecommendationApi from '../../Apis/recommendationApi';
import ChallengeCard from '../../Components/Card';
import { FlexRowCenterCSS } from '../../CSS/common';
import Loading from './Components/Loading';

let testCount = 0;

function RandomRecommendation() {
  console.log('testCount ==> ', testCount);

  const [isRandomStart, setIsRandomStart] = useState<boolean>(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  const [results, setResults] = useState<ResultChallenge>({
    id: 0,
    title: '',
    content: '',
    challengeImgUrls: [],
  });

  const onStartRandom = async () => {
    ++testCount;

    setIsShowResult(false);
    setIsRandomStart(true);

    try {
      const { data } = await RecommendationApi.getRandomResult();
      setResults(data);

      setTimeout(() => {
        setIsRandomStart(false);
        setIsShowResult(true);
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>무작위로 하나 추천해 드릴게요!</S.Title>
        <S.Box>
          {!isShowResult ? (
            !isRandomStart ? (
              <S.Button onClick={onStartRandom}>START</S.Button>
            ) : (
              <>
                {testCount < 3 ? (
                  <div>마음에 들지 않으면 다시 추천을 받을 수도 있어요</div>
                ) : (
                  <div>계속 마음에 들지 않는다면 직접 챌린지를 만들어보는 건 어때요?</div>
                )}
                <Loading />
              </>
            )
          ) : (
            <>
              <S.CardContainer>
                <ChallengeCard
                  id={results.id}
                  title={results.title}
                  content={results.content}
                  img={results.challengeImgUrls}
                />
              </S.CardContainer>
              {testCount < 3 ? (
                <S.smallButton onClick={onStartRandom}>다시 추천받기</S.smallButton>
              ) : (
                <>
                  <S.smallButton onClick={onStartRandom}>다시 추천받기</S.smallButton>
                  <Link style={{ display: 'block', marginTop: '20px' }} to={'/createchallenge'}>
                    직접 챌린지 만들러 가기
                  </Link>
                </>
              )}
            </>
          )}
        </S.Box>
      </S.Container>
    </S.Wrapper>
  );
}
export default RandomRecommendation;

const Wrapper = styled.div`
  ${FlexRowCenterCSS}
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 120px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 38px;
  font-weight: bold;
`;

const Box = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 30px;
`;

const Button = styled.button`
  border: none;
  width: 20%;
  height: 70px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 30px;
  background-color: var(--color-sky);
  :hover {
    cursor: pointer;
    background-color: #afc3e9;
    transition: all 0.1s ease-in-out;
  }
`;

const smallButton = styled(Button)`
  font-size: 20px;
  width: 20%;
  height: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

const S = {
  Wrapper,
  Container,
  Box,
  Title,
  Button,
  smallButton,
  CardContainer,
};

interface ResultChallenge {
  id: number;
  title: string;
  content: string;
  challengeImgUrls: string[];
}
