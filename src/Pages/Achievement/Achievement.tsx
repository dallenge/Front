import styled from 'styled-components';
import { FlexAlignCSS, FlexCenterCSS, FlexColumnCenterCSS } from '../../CSS/common';

const medals = [
  {
    title: '🔥 챌린지 습관 만들기',
    content: '진행 챌린지를 모두 수행하면 돼요',
    medal: [
      { url: '/medal/routine/10.svg', state: false },
      { url: '/medal/routine/20.svg', state: false },
      { url: '/medal/routine/30.svg', state: false },
      { url: '/medal/routine/40.svg', state: false },
      { url: '/medal/routine/50.svg', state: false },
    ],
  },
  {
    title: '✍️ 기록하는 습관',
    content: '진행 챌린지에 기록을 하면 돼요',
    medal: [
      { url: '/medal/record/10.svg', state: false },
      { url: '/medal/record/20.svg', state: false },
      { url: '/medal/record/30.svg', state: false },
      { url: '/medal/record/40.svg', state: false },
      { url: '/medal/record/50.svg', state: false },
    ],
  },
  {
    title: '💡 나만의 챌린지 완성!',
    content: '챌린지를 등록하면 돼요',
    medal: [
      { url: '/medal/write/10.svg', state: false },
      { url: '/medal/write/15.svg', state: false },
      { url: '/medal/write/20.svg', state: false },
      { url: '/medal/write/25.svg', state: false },
      { url: '/medal/write/30.svg', state: false },
    ],
  },
];

function Achievement() {
  return (
    <S.Wrapper>
      <S.Container>
        {medals.map((medal, idx) => (
          <S.Box key={idx}>
            <S.Title>{medal.title}</S.Title>
            <div style={{ marginLeft: '50px' }}>{medal.content}</div>
            <S.MedalContainer>
              {medal.medal.map((type, idx) => (
                <S.Image key={idx} src={`${type.url}`} alt="" state={type.state} />
              ))}
            </S.MedalContainer>
          </S.Box>
        ))}
      </S.Container>
    </S.Wrapper>
  );
}
export default Achievement;

const Wrapper = styled.div`
  min-height: 80vh;
  ${FlexCenterCSS}
`;

const Container = styled.div`
  width: 60%;
  margin-top: 50px;
`;

const Box = styled.div`
  border: 1px solid rgb(220, 220, 220);
  background-color: #ebeff7;
  border-radius: 10px;
  width: 100%;
  padding: 30px;
  ${FlexColumnCenterCSS}
  align-items: flex-start;
  margin: 20px;
`;

const MedalContainer = styled.div`
  width: 100%;
  ${FlexAlignCSS}
  margin: 10px;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 14px;
`;

const Image = styled.img<{ state: boolean }>`
  width: 160px;
  margin: 10px;
  background-color: ${({ state }) => state && '#bdcff1'};
  padding: 10px;
  border-radius: 10px;
`;

const S = { Wrapper, Container, Box, Title, MedalContainer, Image };
