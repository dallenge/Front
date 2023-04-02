import { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { pageLoop } from '../../../../../Utils/pagination';
import styled from 'styled-components';
import { AiOutlineClose, AiFillHeart } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import CommentApi from '../../../../../Apis/commentApi';
import { useNavigate } from 'react-router-dom';
import { FlexAlignCSS } from '../../../../../CSS/common';

import { useRecoilState } from 'recoil';
import { isAlertModalAtom, alertMessageAtom } from '../../../../../Atoms/modal.atom';
import AlertModal from '../../../../../Components/Modal';

const URL = process.env.REACT_APP_URL;

interface CommentINTERFACE {
  id: number;
  content: string;
  likes: number;
  createdAt: string;
  commentImgUrls: string[];
  challengeId: number;
  challengeTitle: string;
}

function CommentList() {
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('최신순');

  const [commentsList, setCommentsList] = useState<CommentINTERFACE[]>([]);

  const [isAlertModal, setIsAlertModal] = useRecoilState<boolean>(isAlertModalAtom);
  const [alertMessage, setAlertMessage] = useRecoilState<string>(alertMessageAtom);

  const navigate = useNavigate();

  const getUserComments = useCallback(
    async (sort?: string) => {
      const size = 10;
      try {
        const { data } = await CommentApi.getUserComments(localStorage.getItem('userId'), { size, page, sort });
        setCommentsList(data.content);
        setTotalPage(Math.ceil(data.totalElements / 10));
      } catch (err: any) {
        setAlertMessage(err.response.data.message || '토큰');
        setIsAlertModal(true);
      }
    },
    [page],
  );

  useEffect(() => {
    getUserComments();
  }, [getUserComments]);

  const onDeleteComment = async (challengeId: number, commentId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await CommentApi.deleteComment(challengeId, commentId);
        getUserComments(selectedFilter === '최신순' ? 'time' : 'likes');
      } catch (err: any) {
        setAlertMessage(err.response.data.message || '토큰');
        setIsAlertModal(true);
      }
    }
  };

  const onClickFilter = (clickFilter: string): void => {
    setSelectedFilter(clickFilter);
    setPage(0);
    setIsOpenFilter(false);

    if (clickFilter === '최신순') {
      getUserComments('time');
    }
    if (clickFilter === '좋아요순') {
      getUserComments('likes');
    }
  };

  return (
    <>
      {isAlertModal && <AlertModal content={alertMessage} />}
      <S.Wrapper>
        <S.PageTitle>내가 쓴 후기</S.PageTitle>
        <S.FilterBox>
          <span>{selectedFilter}</span>
          <span onClick={() => setIsOpenFilter((prev) => !prev)}>
            <IoIosArrowDown size={20} />
          </span>
        </S.FilterBox>
        <S.FilterOpenBox state={isOpenFilter}>
          <S.FilterText onClick={() => onClickFilter('최신순')} state={'최신순' === selectedFilter}>
            최신순
          </S.FilterText>
          <S.FilterText onClick={() => onClickFilter('좋아요순')} state={'좋아요순' === selectedFilter}>
            좋아요순
          </S.FilterText>
        </S.FilterOpenBox>
        {commentsList.map((comment) => (
          <>
            <S.Container>
              <S.CommentBox>
                <S.FlexLine>
                  <S.Title onClick={() => navigate(`/challenge/${comment.challengeId}`)}>
                    {comment.challengeTitle}
                    <span>{comment.createdAt}</span>
                  </S.Title>
                  <S.IconBox onClick={() => onDeleteComment(comment.challengeId, comment.id)}>
                    <AiOutlineClose size={25} />
                  </S.IconBox>
                </S.FlexLine>
                <S.ContentBox>
                  <S.ImageBox
                    image={comment.commentImgUrls.length > 0 ? `${URL}${comment.commentImgUrls[0]}` : `/logo.png`}
                  />
                  <S.TextBox>{comment.content}</S.TextBox>
                </S.ContentBox>
                <S.FlexLine style={{ justifyContent: 'flex-end' }}>
                  <AiFillHeart size={28} />
                  <span>{comment.likes}</span>
                </S.FlexLine>
              </S.CommentBox>
            </S.Container>
          </>
        ))}
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
      </S.Wrapper>
    </>
  );
}
export default CommentList;

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  position: relative;
  ${FlexAlignCSS}
  flex-direction: column;
  padding-top: 170px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  position: absolute;
  left: 4%;
  top: 60px;
`;

const FilterBox = styled.div`
  position: absolute;
  top: 103px;
  right: 20%;
  display: flex;
  width: 136.41px;
  justify-content: space-between;
  border: 2px solid var(--color-sky);
  padding: 10px 10px 10px 20px;
  background-color: #f1f4fb;
  & > span:last-child {
    margin-left: 20px;
    :hover {
      cursor: pointer;
    }
  }
`;

const FilterOpenBox = styled.div<{ state: boolean }>`
  display: ${({ state }) => (state ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  width: 136.41px;
  align-items: flex-start;
  border: 2px solid var(--color-sky);
  background-color: #f1f4fb;
  right: 20%;
  top: 149px;

  & > div:first-child {
    border-bottom: 1px solid rgb(210, 210, 210);
  }
`;

const FilterText = styled.div<{ state: boolean }>`
  padding: 10px;
  width: 100%;
  color: ${({ state }) => state && 'var(--color-blue)'};
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
  }
  & > span {
    font-size: 15px;
    margin-left: 30px;
    font-weight: 500;
    :hover {
      cursor: default;
    }
  }
`;
const Container = styled.div`
  width: 60%;
`;
const CommentBox = styled.div`
  border: 2px solid var(--color-sky);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  margin-bottom: 30px;
`;

const FlexLine = styled.div`
  display: flex;
  width: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
`;

const ImageBox = styled.div<{ image: string }>`
  width: 30%;
  height: 20vh;
  background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const TextBox = styled.div`
  width: 60%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;
const IconBox = styled.div`
  margin-left: auto;
  :hover {
    cursor: pointer;
  }
`;

const S = {
  Wrapper,
  PageTitle,
  Title,
  Container,
  FilterBox,
  FilterOpenBox,
  FilterText,
  FlexLine,
  ContentBox,
  CommentBox,
  ImageBox,
  TextBox,
  IconBox,
};
