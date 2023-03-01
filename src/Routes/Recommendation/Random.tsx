import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './Components/Loading';

let testCount = 0;

function RandomRecommendation() {
  console.log('testCount ==> ', testCount);

  const [isRandomStart, setIsRandomStart] = useState<boolean>(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  const onStartRandom = () => {
    ++testCount;

    setIsShowResult(false);
    setIsRandomStart(true);

    setTimeout(() => {
      setIsRandomStart(false);
      setIsShowResult(true);
    }, 5000);
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
              <div>RESULT</div>
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
  display: flex;
  justify-content: center;
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 200px;
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
  width: 100%;
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
  width: 50%;
  height: 40px;
`;

const S = {
  Wrapper,
  Container,
  Box,
  Title,
  Button,
  smallButton,
};
