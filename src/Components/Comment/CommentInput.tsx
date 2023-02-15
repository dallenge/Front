import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';

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

    const commentDto = {
      content: writeText,
    };

    const formData = new FormData();

    if (imageRef.current?.files?.length === 0) {
      // 글만 입력했을 때
      formData.append('commentDto', new Blob([JSON.stringify(commentDto)], { type: 'application/json' }));
    } else if (!writeText) {
      // 사진만 업로드 했을 때
      formData.append('commentDtoImg', uploadImage);
    } else {
      // 둘다 입력했을 떄
      formData.append('commentDto', new Blob([JSON.stringify(commentDto)], { type: 'application/json' }));
      formData.append('commentDtoImg', uploadImage);
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

  return (
    <S.Form>
      <input type={'file'} style={{ width: '90%' }} ref={imageRef} onChange={onUploadImage} />
      <S.Textarea value={writeText} onChange={(e) => setWriteText(e.target.value)} placeholder="댓글로 기록하기.." />
      <S.Text>
        <S.Button onClick={onClickSubmitComment}>기록하기</S.Button>
      </S.Text>
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

const Text = styled.div`
  width: 90%;
  display: inline-block;
`;

const Button = styled.button`
  border: none;
  background-color: var(--color-sky);
  float: right;
  font-weight: bold;
  padding: 7px;
  width: 100px;
  :hover {
    background-color: #bbcef1;
  }
`;

const S = {
  Form,
  Textarea,
  Button,
  Text,
};
