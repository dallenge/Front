import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AchievementApi from '../../Apis/achievement';
import AccessModal from '../../Components/Home/Modal';
import { FlexAlignCSS, FlexCenterCSS, FlexColumnCenterCSS } from '../../CSS/common';

const URL = process.env.REACT_APP_URL;

interface Medal {
  badgeName: string;
  badgeStatus: boolean;
  badgeImgUrl: string[];
}

const MEDAL_TITLE = ['🔥 챌린지 습관 만들기', '✍️ 기록하는 습관', '💡 나만의 챌린지 완성!'];
const MEDAL_CONTENT = ['진행 챌린지를 수행하면 돼요', '진행 챌린지에 기록을 하면 돼요', '챌린지를 등록하면 돼요'];

function Achievement() {
  const [medalsList, setMedalsList] = useState<Medal[][]>([]);
  const [isOpenAccessModal, setIsOpenAccessModal] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) setIsOpenAccessModal(true);
  }, []);

  useEffect(() => {
    const getBadges = async () => {
      try {
        const { data } = await AchievementApi.getUserBadge();
        const splicedList: Medal[][] = [];
        for (let i = 0; i < data.length; i += 5) {
          splicedList.push(data.slice(i, i + 5));
        }
        setMedalsList(splicedList);
      } catch (err: any) {
        if (err.response.status === 401) {
          setIsOpenAccessModal(true);
        }
      }
    };
    getBadges();
  }, []);

  return (
    <>
      {isOpenAccessModal && <AccessModal setOpen={setIsOpenAccessModal} />}
      <S.Wrapper>
        <S.Container>
          {medalsList.map((medals, idx) => (
            <S.Box key={idx}>
              <S.Title>{MEDAL_TITLE[idx]}</S.Title>
              <div style={{ marginLeft: '50px' }}>{MEDAL_CONTENT[idx]}</div>
              <S.MedalContainer>
                {medals.map((medal, idx) => (
                  <S.Image key={idx} src={`${URL}/${medal.badgeImgUrl}`} alt="" state={medal.badgeStatus} />
                ))}
              </S.MedalContainer>
            </S.Box>
          ))}
        </S.Container>
      </S.Wrapper>
    </>
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
  width: 17%;
  margin: 10px;
  background-color: ${({ state }) => state && '#bdcff1'};
  padding: 10px;
  border-radius: 10px;
`;

const S = { Wrapper, Container, Box, Title, MedalContainer, Image };
