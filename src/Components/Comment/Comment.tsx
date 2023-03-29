import styled from 'styled-components';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { useEffect, useRef, useState } from 'react';

import Modal from './Modal';
import CommentArea from './Components/CommentArea';
import CommentApi from '../../Apis/commentApi';
import { UserInfoINTERFACE } from '../../Interfaces';
import { FlexAlignCSS } from '../../CSS/common';
import { useSetRecoilState } from 'recoil';
import { alertMessageAtom, isAlertModalAtom } from '../../Atoms/modal.atom';

interface Props {
  challengeId: string;
  commentId: string;
  content: string;
  likes: number;
  createdAt: string;
  img: string[];
  owner: {
    userName: string;
    email: string;
    userId: number;
  };
  myComment: boolean;
  commentLikeUsersInfo: UserInfoINTERFACE[];
  getComments: () => void;
}

function Comment(props: Props) {
  const URL = process.env.REACT_APP_URL;

  const {
    challengeId,
    commentId,
    content,
    likes,
    createdAt,
    img,
    owner,
    myComment,
    commentLikeUsersInfo,
    getComments,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isEditOk, setIsEditOk] = useState<boolean>(false);
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes);

  const [editCommentText, setEditCommentText] = useState<string>(content);
  const editImageRef = useRef<HTMLInputElement>(null);
  const [editImage, setEditImage] = useState<any>();

  const setIsAlertModal = useSetRecoilState<boolean>(isAlertModalAtom);
  const setAlertMessage = useSetRecoilState<string>(alertMessageAtom);

  useEffect(() => {
    commentLikeUsersInfo.forEach((user) => {
      const userId = localStorage.getItem('userId');
      userId && user.userId === +userId ? setIsHeart(true) : setIsHeart(false);
    });
  }, []);

  const onClickModal = () => setIsModalOpen((prev) => !prev);

  const onChangeEditCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditCommentText(e.target.value);

    if (e.target.value && content !== e.target.value) return setIsEditOk(true);
    setIsEditOk(false);
  };

  const onClickEditCommentBtn = async () => {
    if (!isEditOk) return;

    const formData = new FormData();
    if (editImage === img) {
      formData.append(
        'commentDto',
        new Blob([JSON.stringify({ content: editCommentText })], { type: 'application/json' }),
      );
    } else if (!editCommentText) {
      formData.append('commentImgFiles', editImage);
    } else {
      formData.append(
        'commentDto',
        new Blob([JSON.stringify({ content: editCommentText })], { type: 'application/json' }),
      );
      formData.append('commentImgFiles', editImage);
    }

    try {
      await CommentApi.editComment(challengeId, commentId, formData);
      getComments();
      setIsEditOk(false);
      setIsEditComment(false);
    } catch (err: any) {
      setIsAlertModal(true);
      setAlertMessage(err.response.data.message || '토큰');
    }
  };

  const onUploadEditImage = () => {
    if (editImageRef.current?.files) {
      setEditImage(editImageRef.current?.files[0]);
      setIsEditOk(true);
    }
  };

  const onClickCommentHeart = async () => {
    if (!localStorage.getItem('token')) return alert('로그인 후 이용해 주세요');

    if (!isHeart) {
      // 좋아요 추가
      try {
        await CommentApi.commentLikes(commentId, 1);
        setIsHeart(true);
        setLikeCount((prev) => prev + 1);
      } catch (err: any) {
        setIsAlertModal(true);
        setAlertMessage(err.response.data.message || '토큰');
      }
    } else {
      // 좋아요 취소
      try {
        await CommentApi.commentLikes(commentId, 0);
        setIsHeart(false);
        setLikeCount((prev) => prev - 1);
      } catch (err: any) {
        setIsAlertModal(true);
        setAlertMessage(err.response.data.message || '토큰');
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Text>
        <S.Text size={'18px'}>{owner.userName}</S.Text>
        <S.Text size={'14px'} style={{ color: 'rgb(150, 150, 150)', marginLeft: '20px' }}>
          {createdAt}
        </S.Text>
        {myComment && !isEditComment && (
          <S.HoverText style={{ marginLeft: 'auto' }}>
            <BiDotsHorizontalRounded size={30} onClick={onClickModal} />
          </S.HoverText>
        )}
      </S.Text>
      {!isEditComment ? (
        <S.Form>
          <S.Text>{img.length !== 0 && <S.Image src={`${URL}` + `${img}`} />}</S.Text>
          <S.ContentText>{content}</S.ContentText>
          <Modal
            state={isModalOpen}
            challengeId={challengeId}
            commentId={commentId}
            getComments={getComments}
            setIsModalOpen={setIsModalOpen}
            setIsEditComment={setIsEditComment}
          />
          <S.Text>
            <S.IconBox onClick={onClickCommentHeart}>
              {isHeart ? <AiFillHeart size={28} color={'red'} /> : <AiOutlineHeart size={28} />}
            </S.IconBox>
            <SmallText>{likeCount}</SmallText>
          </S.Text>
        </S.Form>
      ) : (
        <S.EditForm>
          <CommentArea
            imageRef={editImageRef}
            imageValue={editImage}
            onUploadImage={onUploadEditImage}
            isEditComment={isEditComment}
            setIsEditComment={setIsEditComment}
            textValue={editCommentText}
            onChangeWriteComment={onChangeEditCommentText}
            onClickEditCommentBtn={onClickEditCommentBtn}
            children={'수정하기'}
            isEditOk={isEditOk}
          />
        </S.EditForm>
      )}
    </S.Wrapper>
  );
}
export default Comment;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding-bottom: 40px;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-top: 30px;
`;

const Text = styled.div<{ size?: string }>`
  ${FlexAlignCSS}
  font-size: ${({ size }) => size};
  font-weight: bold;
`;

const HoverText = styled(Text)`
  :hover {
    cursor: pointer;
  }
`;

const ContentText = styled(Text)`
  align-items: initial;
  padding: 20px 0 20px 30px;
`;

const Form = styled.div`
  display: flex;
  padding: 10px 20px;
  margin-top: 20px;
  padding-right: 0;
`;

const Image = styled.img`
  width: 200px;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 130px;
  resize: none;
  border: 1px solid rgb(220, 220, 220);
  padding: 20px;
  :focus-visible {
    outline: none;
  }
`;

const EditForm = styled(Form)`
  flex-direction: column;
`;

const SmallText = styled.span`
  font-size: 20px;
  padding-bottom: 3px;
  margin-left: 5px;
`;

const IconBox = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const S = {
  Wrapper,
  Text,
  Image,
  Form,
  HoverText,
  ContentText,
  Textarea,
  EditForm,
  SmallText,
  IconBox,
};
