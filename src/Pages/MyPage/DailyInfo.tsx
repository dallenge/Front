import styled from 'styled-components';
import { FlexBetweenCSS, FlexCenterCSS } from '../../CSS/common';

const DailyBox = styled.div`
  width: 96%;
  height: 110px;
  ${FlexBetweenCSS}
  padding: 10px;
`;
const DayBox = styled.div<{ background: string }>`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background: ${(props) => props.background};
  font-size: 20px;
  ${FlexCenterCSS}
`;

const DailyInfo = ({ weeklyAchievement }: { weeklyAchievement: boolean[] }) => {
  const weeksday = ['월', '화', '수', '목', '금', '토', '일'];
  return (
    <DailyBox>
      {weeklyAchievement.map((achievement, i) => {
        if (achievement) return <DayBox background="var(--color-blue)">{weeksday[i]}</DayBox>;
        else return <DayBox background="white">{weeksday[i]}</DayBox>;
      })}
    </DailyBox>
  );
};

export default DailyInfo;
