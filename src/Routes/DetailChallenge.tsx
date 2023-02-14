import styled, { css } from 'styled-components';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { useCallback, useEffect, useState } from 'react';
import CommentBox from '../Components/Comment/CommentBox';
import Comment from '../Components/Comment/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import URL from '../Url';
import GetBadRoot from '../Components/GetBadRoot';

function DetailChallenge() {
  const URL = process.env.REACT_APP_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [challengeInfo, setChallengeInfo] = useState<Challenge>();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const [heart, setHeart] = useState<boolean>(false);

  const [isBadRoot, setIsBadRoot] = useState<boolean>(false);

  interface Challenge {
    responseChallenge: {
      id: string;
      title: string;
      content: string;
      challengeCategory: string;
      challengeLocation: string;
      challengeDuration: string;
      created_at: string;
      challengeImgUrls: string[];
      howManyUsersAreInThisChallenge: number;
      challengeOwnerUser: {
        userName: string;
        email: string;
        userId: number;
      };
    };
    responseUserChallenges: {
      challengeStatus: string;
      participatedUser: {
        userName: string;
        email: string;
        userId: number;
      };
    }[];
  }

  interface Comment {
    id: string;
    content: string;
    likes: number;
    createdAt: string;
    commentImgUrls: string[];
    commentOwnerUser: {
      userName: string;
      email: string;
      userId: number;
    };
  }

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${URL}/challenge/${id}`,
    };
    axios(config)
      .then((res) => {
        setChallengeInfo(res.data);
        // const temp = { ...res.data };
        // temp.responseChallenge.challengeImgUrls = `${URL}` + res.data.responseChallenge.challengeImgUrls;
        // setChallengeInfo(temp);
        // console.log(temp);
      })
      .catch((err) => {
        setIsBadRoot(true);
      });
  }, []);

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${URL}/${id}/comment`,
    };
    axios(config).then((res) => setCommentList(res.data.content));
  }, []);

  const onClickHeart = () => {
    setHeart(!heart);
    // 서버에 post 및 화면 refresh
  };

  const onclickGetStart = () => {
    // 버튼에 text 변경
    // 서버에 post
  };

  return (
    <>
      {!isBadRoot && challengeInfo ? (
        <S.Container>
          <S.Wrapper>
            <div>
              <S.Text style={{ marginTop: '20px' }}>
                <S.Line w={'12%'} />
                <S.HoverText size={'14px'} onClick={() => navigate('/challengelist')}>
                  목록
                </S.HoverText>
                <S.Text size={'14px'}>/</S.Text>
                <S.HoverText
                  size={'14px'}
                  style={{ color: 'var(--color-blue)' }}
                  onClick={() => navigate(`/challengelist//${challengeInfo.responseChallenge.challengeCategory}`)}
                >
                  {challengeInfo.responseChallenge.challengeCategory}
                </S.HoverText>
                <S.Line grow={1} />
              </S.Text>
            </div>
            <S.Form>
              {/* Form 왼쪽 */}
              <S.ContentBox>
                <S.Image
                  src={
                    challengeInfo.responseChallenge.challengeImgUrls.length != 0
                      ? `${URL}` + `${challengeInfo.responseChallenge.challengeImgUrls}`
                      : '/logo.png'
                  }
                  alt="challenge_img"
                ></S.Image>
              </S.ContentBox>
              {/* Form 오른쪽 */}
              <S.ContentBox padding={'50px'}>
                <Text size={'25px'} padding={'15px 0'}>
                  {challengeInfo.responseChallenge.title}
                </Text>
                <S.Text padding={'15px 0'}>{challengeInfo.responseChallenge.content}</S.Text>
                <S.Text>📍 {challengeInfo.responseChallenge.challengeLocation}</S.Text>
                <S.Text>🕒 {challengeInfo.responseChallenge.challengeDuration}</S.Text>
                <S.Text>🏃🏻 지금 {challengeInfo.responseChallenge.howManyUsersAreInThisChallenge}명 참여중</S.Text>
                <S.Text padding={'15px 0'} color={'rgb(130, 130, 130)'}>
                  <S.Text style={{ marginRight: '20px' }}>
                    시작한 델린저: {challengeInfo.responseChallenge.challengeOwnerUser.userName}
                  </S.Text>
                  <S.Text>{challengeInfo.responseChallenge.created_at}</S.Text>
                </S.Text>
                <S.Button>지금 바로 참여하기</S.Button>
              </S.ContentBox>
            </S.Form>
            <S.Line w={'100%'}></S.Line>
          </S.Wrapper>
        </S.Container>
      ) : (
        <GetBadRoot />
      )}
    </>
  );
}
export default DetailChallenge;

const Container = styled.div`
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f9fafb;
`;

const ContentBox = styled.div<{ padding?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: ${({ padding }) => padding};
`;

const Image = styled.img`
  width: 100%;
`;

const Line = styled.div<{ w?: string; grow?: number }>`
  height: 1px;
  width: ${({ w }) => w};
  background-color: rgb(180, 180, 180);
  flex-grow: ${({ grow }) => grow};
`;

const Text = styled.div<{ padding?: string; size?: string; color?: string }>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};
  /* color: rgb(120, 120, 120); */
  padding: ${({ padding }) => padding};
  font-weight: bold;
  font-size: ${({ size }) => size};
`;

const HoverText = styled(Text)`
  padding: 0 5px;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  background-color: var(--color-sky);
  font-weight: bold;
  :hover {
    background-color: #bbcef1;
  }
`;

const S = {
  // 스타일 컴포넌트
  Container,
  Wrapper,
  Form,
  Line,
  Text,
  HoverText,
  ContentBox,
  Image,
  Button,
};
