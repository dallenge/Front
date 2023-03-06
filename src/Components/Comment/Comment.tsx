import styled from 'styled-components';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import CommentInput from './CommentInput';
import CommentArea from './Components/CommentArea';
import axios from 'axios';

function Comment(props: Props) {
  const URL = process.env.REACT_APP_URL;

  const { challengeId, commentId, content, likes, createdAt, img, owner, myComment, getComments } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isEditOk, setIsEditOk] = useState(false);

  const [editCommentText, setEditCommentText] = useState<string>(content);
  const editImageRef = useRef<HTMLInputElement>(null);
  const [editImage, setEditImage] = useState<any>();

  const onClickModal = () => setIsModalOpen((prev) => !prev);

  const onChangeEditCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditCommentText(e.target.value);

    if (e.target.value && content !== e.target.value) {
      setIsEditOk(true);
    } else {
      setIsEditOk(false);
    }
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

    const config = {
      method: 'post',
      url: `${URL}/${challengeId}/comment/${commentId}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    await axios(config)
      .then((res) => {
        getComments();
        setIsEditOk(false);
        setIsEditComment(false);
      })
      .catch((err) => {
        alert('잠시후 다시 시도해주세요');
      });
  };

  const onUploadEditImage = () => {
    if (editImageRef.current?.files) {
      setEditImage(editImageRef.current?.files[0]);
      setIsEditOk(true);
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
  display: flex;
  align-items: center;
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
const S = {
  Wrapper,
  Text,
  Image,
  Form,
  HoverText,
  ContentText,
  Textarea,
  EditForm,
};

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
  getComments: () => void;
}
