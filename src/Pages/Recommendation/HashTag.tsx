import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import RecommendationApi from '../../Apis/recommendationApi';

import ChallengeCard from '../../Components/Card';
import FadeText from '../../Components/FadeText';

const textArray = ['누르시면 관련 챌린지 3개를 추천해드려요!', '지금 인기있는 해시태그들이에요!'];

function HashTagRecommendation() {
  const [results, setResults] = useState<ResultChallenge[]>([]);

  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedContents, setSelectedContents] = useState<ChallengeContent[]>([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const { data } = await RecommendationApi.getHashtagResult();
        setResults(data);
      } catch (err) {
        console.trace(err);
      }
    };
    getResults();
  }, []);

  const onClickHashTag = (tag: string, recommendedChallenges: ChallengeContent[]): void => {
    setSelectedTag(tag);
    setSelectedContents(recommendedChallenges);
  };

  return (
    <S.Wrapper>
      <S.Title>
        <FadeText textArray={textArray} />
      </S.Title>
      <S.FlexBox>
        {results.map((result, idx) => (
          <S.ItemBox>
            <S.Subtitle
              key={idx}
              state={selectedTag === result.hashtagContent ? 'select' : ''}
              onClick={() => onClickHashTag(result.hashtagContent, result.recommendedChallenges)}
            >
              # {result.hashtagContent}
            </S.Subtitle>
            <S.SubText>{result.hashtagTagCount}개 진행중 🏃</S.SubText>
          </S.ItemBox>
        ))}
      </S.FlexBox>
      <S.FlexCardBox>
        {selectedContents.map((challenge) => (
          <ChallengeCard
            id={challenge.id}
            title={challenge.title}
            content={challenge.content}
            img={challenge.challengeImgUrls}
          />
        ))}
      </S.FlexCardBox>
    </S.Wrapper>
  );
}
export default HashTagRecommendation;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextFadeIn = keyframes`
 0% {
    opacity: 0;
    top: 0px;
  }
  25% {
    opacity: 1; 
  }
  50% {
    opacity: 1;
    top: 10px
  }
  75% {
    opacity: 1;
    top: 10px
  }
  100% {
    opacity: 0;
    top: 0px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 100px;
  position: relative;
  animation: ${TextFadeIn} 5s infinite alternate;
  margin-bottom: 50px;
`;

const FlexBox = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FlexCardBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-bottom: 35px;
`;

const Subtitle = styled.div<{ state: string }>`
  font-size: 20px;
  font-weight: bold;
  width: 140px;
  line-height: 50px;
  border-radius: 10px;
  background-color: ${({ state }) => (state === 'select' ? '#c5d8fb' : 'var(--color-sky)')};
  padding: 10px;
  :hover {
    background-color: #c5d8fb;
    cursor: pointer;
  }
`;

const SubText = styled.div`
  width: 140px;
  padding: 20px;
  font-weight: bold;
  color: var(--color-blue);
`;

const S = { Wrapper, Title, FlexBox, ItemBox, Subtitle, SubText, FlexCardBox };

interface ResultChallenge {
  hashtagId: number;
  hashtagContent: string;
  hashtagTagCount: number;
  recommendedChallenges: ChallengeContent[];
}

interface ChallengeContent {
  id: number;
  title: string;
  content: string;
  challengeImgUrls: string[];
}
