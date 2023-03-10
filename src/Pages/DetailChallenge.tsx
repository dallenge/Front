import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import GetBadRoot from '../Components/GetBadRoot';
import CommentInput from '../Components/Comment/CommentInput';
import Comment from '../Components/Comment/Comment';

import { pageLoop } from '../Utils/pagination';
import { Pagination } from 'react-bootstrap';
import ChallengeApi from '../Apis/challengeApi';
import Loading from './Recommendation/Components/Loading';
import AuthApi from '../Apis/authApi';

let bookmarkId: number;

function DetailChallenge() {
  const URL = process.env.REACT_APP_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [challengeInfo, setChallengeInfo] = useState<Challenge>();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [isParticipatedChallenge, setIsParticipatedChallenge] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const [isBadRoot, setIsBadRoot] = useState<boolean | null>(null);

  const getChallengeInfo = useCallback(async () => {
    try {
      const res = await ChallengeApi.getChallengeData(id);
      setChallengeInfo(res.data);
    } catch (err) {
      setIsBadRoot(true);
    }
  }, [isParticipatedChallenge]);

  const getComments = useCallback(async () => {
    const size = 10;
    try {
      const res = await ChallengeApi.getComments(id, size, page);
      setCommentList(res.data.content);
      setTotalPage(Math.ceil(res.data.totalElements / 10));
      window.scrollTo(0, 0);
    } catch (err) {
      console.trace(err);
    }
  }, [page]);

  useEffect(() => {
    const getMyParticipate = async () => {
      try {
        const { data } = await AuthApi.getMyParticipatedChallenge();
        if (
          data.filter((challenge: { challengeId: number | undefined }) => challenge.challengeId === Number(id)).length >
          0
        ) {
          setIsParticipatedChallenge(true);
        }
      } catch (err) {
        console.trace(err);
      }
    };

    const getMyBookmark = async () => {
      try {
        const { data } = await AuthApi.getMyBookmarkedChallenge();
        const myBookmark = data.content;
        const thisChallengeBookmark = myBookmark.filter(
          (challenge: { challengeId: number | undefined }) => challenge.challengeId === Number(id),
        );
        if (thisChallengeBookmark.length > 0) {
          bookmarkId = thisChallengeBookmark[0].id;
          console.log(bookmarkId);
          setIsBookmark(true);
        }
      } catch (err) {
        console.trace(err);
      }
    };

    getChallengeInfo();
    getComments();
    getMyParticipate();
    getMyBookmark();
  }, []);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    getChallengeInfo();
  }, [getChallengeInfo]);

  const onClickBookmark = async () => {
    if (!isBookmark) {
      // ????????? ??????
      try {
        const { data } = await ChallengeApi.addBookmark(id);
        bookmarkId = data.id;
        setIsBookmark(true);
      } catch (err) {
        alert('????????? ??? ??????????????????');
      }
    } else {
      // ????????? ??????
      try {
        await ChallengeApi.deleteBookmark(bookmarkId);
        setIsBookmark(false);
      } catch (err) {
        alert('????????? ?????? ??????????????????');
      }
    }
  };

  const onClickParticipate = async () => {
    try {
      await ChallengeApi.participateChallenge(id);
      alert('??????????????? ?????????????????????');
      setIsParticipatedChallenge(true);
    } catch (err) {
      if (!localStorage.getItem('token')) return alert('????????? ??? ??????????????????');
    }
  };

  // ?????? ????????? ????????? ??????????????? ????????? ??????
  const getTodayComment = (comments: Comment[]): number => {
    return comments.filter((comment) => comment.createdAt === '??????').length;
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
                  ??????
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
            <S.Form state={'content'}>
              {/* Form ?????? */}
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
              {/* Form ????????? */}
              <S.ContentBox padding={'50px'}>
                <Text size={'25px'} padding={'15px 0'} style={{ justifyContent: 'space-between' }}>
                  <Text>{challengeInfo.responseChallenge.title}</Text>
                  <HoverText onClick={onClickBookmark}>
                    {isBookmark ? <BsBookmarkFill color={'var(--color-blue)'} /> : <BsBookmark />}
                  </HoverText>
                </Text>
                <S.Text padding={'15px 0'}>{challengeInfo.responseChallenge.content}</S.Text>
                <S.Text>???? {challengeInfo.responseChallenge.challengeLocation}</S.Text>
                <S.Text>???? {challengeInfo.responseChallenge.challengeDuration}</S.Text>
                <S.Text>???????? ?????? {challengeInfo.responseChallenge.howManyUsersAreInThisChallenge}??? ?????????</S.Text>
                <S.Text style={{ marginTop: '20px' }}>
                  {challengeInfo.responseChallenge.challengeHashtags.map((hashtage) => (
                    <span>#{hashtage}</span>
                  ))}
                </S.Text>
                <S.Text padding={'15px 0'} color={'rgb(130, 130, 130)'}>
                  <S.Text style={{ marginRight: '20px' }}>
                    ????????? ?????????: {challengeInfo.responseChallenge.challengeOwnerUser.userName}
                  </S.Text>
                  <S.Text>{challengeInfo.responseChallenge.created_at}</S.Text>
                </S.Text>
                <S.Button
                  state={isParticipatedChallenge}
                  onClick={onClickParticipate}
                  disabled={isParticipatedChallenge}
                >
                  {isParticipatedChallenge ? '?????? ??????????????????' : '?????? ?????? ????????????'}
                </S.Button>
              </S.ContentBox>
            </S.Form>
            <S.Line w={'100%'}></S.Line>
          </S.Wrapper>
          <S.Text padding={'20px 0 5px 0'}>?????? {getTodayComment(commentList)}?????? ??????????????</S.Text>
          <CommentInput
            postId={Number(id)}
            getComments={getComments}
            isParticipatedChallenge={isParticipatedChallenge}
          />
          {commentList.map((comment) => {
            return (
              <Comment
                challengeId={challengeInfo.responseChallenge.id}
                commentId={comment.id}
                content={comment.content}
                likes={comment.likes}
                createdAt={comment.createdAt}
                img={comment.commentImgUrls}
                owner={comment.commentOwnerUser}
                myComment={comment.commentOwnerUser.userId === Number(localStorage.getItem('userId'))}
                getComments={getComments}
              />
            );
          })}
          <S.Form>
            <Pagination>
              <Pagination.First
                onClick={() => {
                  setPage(0);
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  if (page !== 0) setPage(page - 1);
                }}
              />
              {pageLoop(page, totalPage, setPage)}
              <Pagination.Next
                onClick={() => {
                  if (page !== totalPage - 1) setPage(page + 1);
                }}
              />
              <Pagination.Last
                onClick={() => {
                  setPage(totalPage - 1);
                }}
              />
            </Pagination>
          </S.Form>
        </S.Container>
      ) : (
        <>{isBadRoot ? <GetBadRoot /> : <Loading />}</>
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

const Form = styled.div<{ state?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${({ state }) => (state === 'content' ? '#f9fafb' : '#ffffff')};
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

const Button = styled.button<{ state?: boolean }>`
  width: 100%;
  border: none;
  color: ${({ state }) => (state ? 'rgb(210, 210, 210)' : '#000000')};
  background-color: ${({ state }) => (state ? 'var(--color-dark-blue)' : 'var(--color-sky)')};
  font-weight: bold;
  height: 50px;
  :hover {
    background-color: ${({ state }) => (state ? 'var(--color-dark-blue)' : '#bbcef1')};
  }
`;

const S = {
  // ????????? ????????????
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
    challengeHashtags: string[];
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
