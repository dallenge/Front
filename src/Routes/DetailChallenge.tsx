import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import URL from '../Url';
import GetBadRoot from '../Components/GetBadRoot';
import CommentInput from '../Components/Comment/CommentInput';
import Comment from '../Components/Comment/Comment';

function DetailChallenge() {
  const URL = process.env.REACT_APP_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [challengeInfo, setChallengeInfo] = useState<Challenge>();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const [bookmark, setBookmark] = useState<boolean>(false);

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
      })
      .catch((err) => {
        setIsBadRoot(true);
      });
  }, []);

  const getComments = () => {
    const config = {
      method: 'get',
      url: `${URL}/${id}/comment`,
    };
    axios(config).then((res) => setCommentList(res.data.content));
  };

  useEffect(() => {
    getComments();
  }, []);

  const onClickBookmark = () => {
    setBookmark((prev) => !prev);
    // 서버에 post 및 화면 refresh
  };

  const onclickGetStart = () => {
    // 버튼에 text 변경
    // 서버에 post
  };

  // ~일 전 구하는 함수
  const getSimpleDate = (date: string) => {
    const createTime = new Date(date);
    const now = new Date();

    const fewYearsAge = now.getFullYear() - createTime.getFullYear();
    const fewMonthAgo = now.getMonth() - createTime.getMonth();
    const fewDaysAgo = now.getDate() - createTime.getDate();

    return {
      fewYearsAge,
      fewMonthAgo,
      fewDaysAgo,
    };
  };

  const getfewAgoList = (commentList: Comment[]) => {
    return commentList.map((comment) => getSimpleDate(comment.createdAt));
  };

  // 오늘 몇개의 후기가 남겨졌는지 구하는 함수
  const getTodayComment = (fewAgoList: { fewYearsAge: number; fewMonthAgo: number; fewDaysAgo: number }[]) => {
    return fewAgoList.filter(
      (object) => object.fewYearsAge === 0 && object.fewMonthAgo === 0 && object.fewDaysAgo === 0,
    ).length;
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
                    challengeInfo.responseChallenge.challengeImgUrls.length !== 0
                      ? `${URL}` + `${challengeInfo.responseChallenge.challengeImgUrls}`
                      : '/logo.png'
                  }
                  alt="challenge_img"
                ></S.Image>
              </S.ContentBox>
              {/* Form 오른쪽 */}
              <S.ContentBox padding={'50px'}>
                <Text size={'25px'} padding={'15px 0'} style={{ justifyContent: 'space-between' }}>
                  <Text>{challengeInfo.responseChallenge.title}</Text>
                  <HoverText onClick={onClickBookmark}>
                    {bookmark ? <BsBookmarkFill color={'var(--color-blue)'} /> : <BsBookmark />}
                  </HoverText>
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
          <S.Text padding={'20px 0 5px 0'}>오늘 {getTodayComment(getfewAgoList(commentList))}개의 기록🏃🏻</S.Text>
          <CommentInput postId={Number(id)} getComments={getComments} />
          {commentList.reverse().map((comment) => {
            return (
              <Comment
                challengeId={challengeInfo.responseChallenge.id}
                commentId={comment.id}
                content={comment.content}
                likes={comment.likes}
                createdAt={getSimpleDate(comment.createdAt)}
                img={comment.commentImgUrls}
                owner={comment.commentOwnerUser}
                myComment={comment.commentOwnerUser.userId === Number(localStorage.getItem('userId'))}
                getComments={getComments}
              />
            );
          })}
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
  height: 50px;
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
