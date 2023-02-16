import { RefObject, useState } from 'react';
import styled from 'styled-components';

interface Props {
  isEditComment?: boolean;
  setIsEditComment?: (state: boolean) => void;
  value: string;
  onChangeWriteComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onClickSubmitComment?: () => void; // 기록하기 버튼 클릭 이벤트
  onClickEditCommentBtn?: () => void; // 수정하기 버튼 클릭 이벤트
  children: string;
  imageRef: RefObject<HTMLInputElement>;
  onUploadImage: () => void;
  imageValue?: any;
  isEditOk?: boolean;
}

function CommentArea({
  isEditComment,
  setIsEditComment,
  value,
  onChangeWriteComment,
  placeholder,
  onClickSubmitComment,
  onClickEditCommentBtn,
  children,
  imageRef,
  onUploadImage,
  imageValue,
  isEditOk = true,
}: Props) {
  const onClickCancel = () => {
    console.log('취소 눌림');
    setIsEditComment && setIsEditComment(false);
  };

  return (
    <>
      <input type={'file'} style={{ width: '90%' }} ref={imageRef} onChange={() => onUploadImage()} />
      <S.Textarea value={value} onChange={(e) => onChangeWriteComment(e)} placeholder={placeholder} />
      <S.Text>
        <S.Button
          state={true}
          onClick={() => {
            isEditComment
              ? onClickEditCommentBtn && onClickEditCommentBtn()
              : onClickSubmitComment && onClickSubmitComment();
          }}
          disabled={!isEditOk}
        >
          {children}
        </S.Button>
        <S.CancelBtn onClick={onClickCancel} state={isEditComment}>
          취소
        </S.CancelBtn>
      </S.Text>
    </>
  );
}
export default CommentArea;

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

const Button = styled.button<{ state?: boolean; disabled?: boolean }>`
  border: none;
  background-color: ${({ disabled }) => (disabled ? 'rgb(120, 120, 120)' : 'var(--color-sky)')};
  float: right;
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? 'rgb(210, 210, 210)' : '#000000')};
  padding: 7px;
  width: 100px;
  visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
  :hover {
    cursor: pointer;
    background-color: ${({ disabled }) => (disabled ? 'rgb(120, 120, 120)' : '#abc6f6')};
  }
  border-radius: 5px;
`;

const CancelBtn = styled(Button)`
  width: 50px;
  background-color: aliceblue;
  margin-right: 10px;
  :hover {
    background-color: rgb(210, 210, 210);
  }
`;

const Text = styled.div`
  width: 90%;
  display: inline-block;
`;

const S = {
  Textarea,
  Button,
  Text,
  CancelBtn,
};
