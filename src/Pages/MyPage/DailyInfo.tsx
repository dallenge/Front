import styled from 'styled-components';

const DailyBox = styled.div`
  width: 96%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const DayBox = styled.div<{ background: string }>`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background: ${(props) => props.background};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
