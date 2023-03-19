import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import S from '../CSS/Home-style';
import Slick from '../Components/Slider';

import { ChallengeList, Challenge, BadgeInfoINTERFACE } from '../Interfaces';
import TodayChallenge from '../Components/Home/TodayChallenge';
import Icons from '../Components/Home/Icons';
import AuthApi from '../Apis/authApi';
import ChallengeApi from '../Apis/challengeApi';
import AchieveModal from '../Components/Achievement/Modal';

const URL = process.env.REACT_APP_URL;

interface itemsProps {
  item: string;
  name: string;
}

const items: itemsProps[] = [
  {
    item: '/main/image1.png',
    name: 'banner1',
  },
  {
    item: '/main/image2.png',
    name: 'banner2',
  },
];

const categories = [
  {
    category: '공부',
    image: '/category/image1.png',
  },
  {
    category: '봉사',
    image: '/category/image2.png',
  },
  {
    category: '운동',
    image: '/category/image3.png',
  },
  {
    category: '경제',
    image: '/category/image4.png',
  },
  {
    category: '건강',
    image: '/category/image5.png',
  },
];

function Home() {
  const navigate = useNavigate();
  const search = useRef<HTMLInputElement>(null);
  const [popularChallenge, setPopularChallenge] = useState<Challenge[]>([]);
  const [myChallengeList, setMyChallengeList] = useState<ChallengeList[]>([]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [resBadgeInfo, setResBadgeInfo] = useState<BadgeInfoINTERFACE>();

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const getMyChallenge = useCallback(async () => {
    try {
      const { data } = await AuthApi.getMyParticipatedChallenge();
      setMyChallengeList(data);
    } catch (err) {
      console.trace(err);
    }
  }, []);

  const onClickCheck = async (status: string, id: number) => {
    if (status === 'SUCCESS') {
      try {
        await ChallengeApi.pauseChallenge(id);
      } catch (err) {
        console.trace(err);
      }
    } else {
      try {
        const { data } = await ChallengeApi.successChallenge(id);
        if (data.badgeInfo) {
          setResBadgeInfo(data.badgeInfo);
          setIsOpenModal(true);
        }
      } catch (err) {
        console.trace(err);
      }
    }
    getMyChallenge();
  };

  useEffect(() => {
    getMyChallenge();
  }, [getMyChallenge]);

  const getPopularChallenge = async () => {
    try {
      const { data } = await ChallengeApi.getPopularChallenge(4);
      setPopularChallenge(data.content);
    } catch (err) {
      console.trace(err);
    }
  };

  useEffect(() => {
    getPopularChallenge();
  }, []);

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          {isOpenModal && resBadgeInfo && (
            <AchieveModal
              onClickToggleModal={onCloseModal}
              name={resBadgeInfo.createBadgeName}
              url={resBadgeInfo.badgeImgUrl}
            />
          )}
          <TodayChallenge myChallengeList={myChallengeList} onClickCheck={onClickCheck} />
        </>
      ) : (
        <S.Main>
          <S.Title>원하는 챌린지를 찾아보세요</S.Title>
          <S.InputContainer>
            <S.Input placeholder="원하는 챌린지를 검색해보세요" autoComplete="off" ref={search} />
            <S.Icon onClick={() => search.current?.value && navigate(`challengelist/${search.current.value}`)}>
              <AiOutlineSearch size={40} />
            </S.Icon>
          </S.InputContainer>
          <Icons />
        </S.Main>
      )}
      <S.BannerWrapper>
        <Slick>
          {items.map((item, index) => (
            <S.BannerImage key={index} alt={item.name} src={item.item} />
          ))}
        </Slick>
      </S.BannerWrapper>
      <S.Card background="white" height="40vh">
        <S.FlexColumn>
          <S.Text>카테고리로 보는 챌린지 ▶️</S.Text>
          <S.CategoryWrapper>
            {categories.map((category, index) => (
              <S.CategoryContainer
                key={index}
                style={{ backgroundImage: `url(${category.image})` }}
                onClick={() => {
                  navigate(`/challengelist//${category.category}`);
                }}
              ></S.CategoryContainer>
            ))}
          </S.CategoryWrapper>
        </S.FlexColumn>
      </S.Card>
      <S.Card background="white" height="500px">
        <S.FlexColumn>
          <S.SmallText>참여자 수로 보는</S.SmallText>
          <S.Text>인기 챌린지 랭킹</S.Text>
          <S.FlexRow>
            <S.RankContainer>
              {popularChallenge.map((challenge, index) => (
                <S.RankChallengeCard onClick={() => (window.location.href = `/challenge/${challenge.id}`)}>
                  <S.SmallText>{index + 1}</S.SmallText>
                  <S.RankImageBox>
                    <S.RankImage
                      src={
                        challenge.challengeImgUrls.length !== 0
                          ? `${URL}` + `${challenge.challengeImgUrls[0]}`
                          : `/logo.png`
                      }
                    />
                  </S.RankImageBox>
                  <S.Text style={{ fontWeight: '500', fontSize: '18px' }}>{challenge.title}</S.Text>
                  <S.SmallText>🏃 {challenge.challengeCategory}</S.SmallText>
                </S.RankChallengeCard>
              ))}
            </S.RankContainer>
            <S.MiddleAdvertising src={'/advertising/image1.png'} />
          </S.FlexRow>
        </S.FlexColumn>
      </S.Card>
    </>
  );
}

export default Home;
