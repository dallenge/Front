import { FlexCenterCSS, FlexColumnCenterCSS, FlexAlignCSS } from './common';
import styled from 'styled-components';

const Card = styled.div<{ background: string; height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  background-size: cover;
`;

const FlexCenterSpace = styled.div`
  ${FlexAlignCSS}
  width: 100%;
  justify-content: space-around;
`;
const CategoryBtn = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0ecec;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: var(--color-sky);
    font-size: 25px;
  }
`;

const Challenge = styled.div`
  width: 300px;
  height: 300px;
  background: var(--color-sky);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`;

const ChallengeBox = styled.div`
  border: 3px solid var(--color-sky);
  background: rgba(219, 226, 239, 0.3);
  border-radius: 8px;
  width: 90%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const TodayChallengeBox = styled(ChallengeBox)`
  background-color: var(--color-blue);
  border: none;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
`;

const CursorDiv = styled.div`
  width: 40px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const DetailDiv = styled.div`
  margin-right: 20px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const TodayWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const TodayTitle = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-top: 30px;
`;

const TodayContainer = styled.div`
  width: 70vw;
  height: 400px;
  margin-top: 40px;
  border: 2px solid var(--color-blue);
  background-color: white;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Main = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-white);
`;

const InputContainer = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 34%;
  height: 60px;
  border-radius: 33px;
  padding: 5px;
  border: 3px solid var(--color-blue);
  background-color: var(--color-light-white);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  width: 85%;
  margin-left: 10px;
  margin-right: 5px;
  background-color: var(--color-light-white);
  :focus-visible {
    outline: none;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const IconWrapper = styled(FlexCenterSpace)`
  width: 30%;
  margin-top: 50px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const IconBox = styled(Icon)`
  background-color: var(--color-light-white);
  border-radius: 5px;
  width: 90px;
  height: 90px;
  box-shadow: 2px 2px 2px rgb(220, 220, 220);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BannerWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 40px;
  height: 208px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 208px;
`;

const CategoryWrapper = styled.div`
  ${FlexCenterCSS}
  justify-content: space-between;
  width: 100%;
`;

const CategoryContainer = styled.div`
  width: 16%;
  height: 140px;
  background-size: cover;
  background-position-y: center;
  border-radius: 8px;
  margin: 0 10px;
  box-shadow: 2px 2px 2px rgb(220, 220, 220);
  :hover {
    cursor: pointer;
  }
`;

const FlexColumn = styled.div`
  ${FlexColumnCenterCSS}
  align-items: flex-start;
  width: 70%;
  margin: 0 auto;
`;

const RankContainer = styled.div`
  width: 80%;
  padding: 16px;
  background-color: #f6f7f880;
  border: 1px solid #e8eaed;
  margin: 0 auto;
  ${FlexAlignCSS}
`;

const RankChallengeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  padding: 8px;
  margin: 6px;
  border: 3px solid rgb(230, 230, 230);
  :hover {
    cursor: pointer;
    background-color: rgb(220, 220, 220);
  }
`;

const RankImageBox = styled.div`
  ${FlexCenterCSS}
  min-height: 200px;
`;

const RankImage = styled.img`
  width: 200px;
  border-radius: 5px;
`;

const SmallText = styled.div`
  font-size: 15px;
`;

const MiddleAdvertising = styled.img`
  width: 350px;
`;

const FlexRow = styled.div`
  width: 100%;
  ${FlexAlignCSS}
  margin: 0 auto;
`;

const S = {
  Card,
  CategoryBtn,
  FlexCenterSpace,
  Challenge,
  ChallengeBox,
  CursorDiv,
  DetailDiv,
  Input,
  TodayWrapper,
  TodayTitle,
  TodayContainer,
  TodayChallengeBox,
  Main,
  InputContainer,
  Title,
  IconWrapper,
  IconContainer,
  IconBox,
  Text,
  Icon,
  BannerWrapper,
  BannerImage,
  CategoryWrapper,
  CategoryContainer,
  FlexColumn,
  RankContainer,
  RankChallengeCard,
  RankImage,
  RankImageBox,
  SmallText,
  MiddleAdvertising,
  FlexRow,
};

export default S;
