import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import CommentArea from './Components/CommentArea';

interface Props {
  postId: number;
  getComments: () => void;
}

function CommentInput({ postId, getComments }: Props) {
  const URL = process.env.REACT_APP_URL;

  const imageRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<any>();
  const [writeText, setWriteText] = useState<string>('');

  const clearInputs = () => {
    setUploadImage(null);
    setWriteText('');
  };

  const onClickSubmitComment = () => {
    if (!writeText && imageRef.current?.files?.length === 0) {
      return alert('사진을 업로드하거나, 내용을 입력해주세요');
    }

    const formData = new FormData();

    if (imageRef.current?.files?.length === 0) {
      // 글만 입력했을 때
      formData.append('commentDto', new Blob([JSON.stringify({ content: writeText })], { type: 'application/json' }));
    } else if (!writeText) {
      // 사진만 업로드 했을 때
      formData.append('commentImgFiles', uploadImage);
    } else {
      // 둘다 입력했을 떄
      formData.append('commentDto', new Blob([JSON.stringify({ content: writeText })], { type: 'application/json' }));
      formData.append('commentImgFiles', uploadImage);
    }

    const config = {
      method: 'post',
      url: `${URL}/${postId}/comment/new`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: formData,
    };

    axios(config)
      .then((res) => {
        getComments();
        clearInputs();
      })
      .catch((err) => console.trace(err));
  };

  const onUploadImage = () => {
    if (imageRef.current?.files) {
      setUploadImage(imageRef.current?.files[0]);
    }
  };

  const onChangeWriteComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWriteText(e.target.value);
  };

  return (
    <S.Form>
      <CommentArea
        imageRef={imageRef}
        onUploadImage={onUploadImage}
        value={writeText}
        onChangeWriteComment={onChangeWriteComment}
        placeholder={'댓글로 기록하기..'}
        onClickSubmitComment={onClickSubmitComment}
        children={'기록하기'}
      />
    </S.Form>
  );
}
export default CommentInput;

const Form = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid rgb(190, 190, 190);
  /* margin-top: 30px; */
  border-radius: 8px;
`;

const S = {
  Form,
};
