import { useRef, useState } from 'react';
import styled from 'styled-components';
import CommentApi from '../../Apis/commentApi';
import { BadgeInfoINTERFACE } from '../../Interfaces';
import CommentArea from './Components/CommentArea';

interface Props {
  postId: number;
  getComments: () => void;
  isParticipatedChallenge: boolean;
  setIsOpenBadgeModal: (state: boolean) => void;
  getBadgeInfo: (data: BadgeInfoINTERFACE) => void;
}

function CommentInput({ postId, getComments, isParticipatedChallenge, setIsOpenBadgeModal, getBadgeInfo }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<any>();
  const [writeText, setWriteText] = useState<string>('');

  const onClickSubmitComment = async () => {
    if (!writeText && imageRef.current?.files?.length === 0) {
      return alert('사진을 업로드하거나, 내용을 입력해주세요');
    }

    if (!localStorage.getItem('token')) return alert('로그인 후 이용해주세요');
    if (!isParticipatedChallenge) return alert('참여하고 있는 델린저만 기록을 남길 수 있습니다');

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

    try {
      const { data } = await CommentApi.addNewComment(postId, formData);
      if (data.badgeInfo) {
        getBadgeInfo(data.badgeInfo);
        setIsOpenBadgeModal(true);
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        alert('기록은 하루에 한번씩 작성할 수 있어요!');
      }
    }
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
        textValue={writeText}
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
