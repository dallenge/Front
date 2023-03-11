import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useScrollFadeIn from '../../Hooks/useScrollFadeIn';

function Recommendation() {
  const navigate = useNavigate();

  const animatedItem: any = {
    1: useScrollFadeIn('up', 1, 0.2),
    2: useScrollFadeIn('up', 1, 0.3),
    3: useScrollFadeIn('up', 1, 0.4),
  };

  useEffect(() => {
    window.scroll(0, 100);
  }, []);

  return (
    <S.Wrapper>
      <S.Title>챌린지를 다양하게 추천받아 보세요!</S.Title>
      <S.Container>
        <S.Box
          onClick={() => (window.location.href = '/get-recommendations/test')}
          background={"url('/recommendation-image/test.jpg')"}
          {...animatedItem[1]}
        >
          챌린지 테스트
        </S.Box>
        <S.Box
          onClick={() => navigate('/get-recommendations/hashtag')}
          background={"url('/recommendation-image/hashtag.jpg')"}
          {...animatedItem[2]}
        >
          인기 해시태그
        </S.Box>
        <S.Box
          onClick={() => navigate('/get-recommendations/random')}
          background={"url('/recommendation-image/random.jpg')"}
          {...animatedItem[3]}
        >
          무작위 랜덤
        </S.Box>
      </S.Container>
    </S.Wrapper>
  );
}
export default Recommendation;

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
  flex-direction: column;
  height: 95vh;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 130px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Box = styled.div<{ background: string }>`
  width: 25%;
  line-height: 250px;
  background-color: gray;
  border-radius: 15px;
  background-image: ${({ background }) => background};
  background-size: 100% 100%;
  font-weight: bold;
  font-size: 28px;
  :hover {
    cursor: pointer;
    width: 26%;
    line-height: 270px;
    font-size: 36px;
  }
`;

const S = {
  Wrapper,
  Title,
  Container,
  Box,
};
