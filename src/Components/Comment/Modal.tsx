import styled from 'styled-components';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

interface Props {
  state: boolean;
  challengeId: string;
  commentId: string;
  getComments: () => void;
  setIsModalOpen: (state: boolean) => void;
  setIsEditComment: (state: boolean) => void;
}

function Modal({ state, challengeId, commentId, getComments, setIsModalOpen, setIsEditComment }: Props) {
  const URL = process.env.REACT_APP_URL;

  const onClickDeleteComment = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const config = {
        method: 'delete',
        url: `${URL}/${challengeId}/comment/${commentId}`,
      };

      await axios(config)
        .then((res) => {
          getComments();
          setIsModalOpen(false);
        })
        .catch((err) => {
          alert('잠시후 다시 시도해주세요');
          setIsModalOpen(false);
        });
    }
  };

  const onClickEditComment = () => {
    setIsEditComment(true);
    setIsModalOpen(false);
  };

  return (
    <S.Wrapper state={state}>
      <S.Text onClick={onClickEditComment}>
        <BiEditAlt size={20} />
        <S.Text>수정하기</S.Text>
      </S.Text>
      <S.Line />
      <S.Text onClick={onClickDeleteComment}>
        <AiOutlineDelete size={20} />
        <S.Text>삭제하기</S.Text>
      </S.Text>
    </S.Wrapper>
  );
}
export default Modal;

const Wrapper = styled.div<{ state?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -28px;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 60px;
  border-radius: 10px;
  visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
  /* border: 1px solid rgb(180, 180, 180); */
  background-color: var(--color-sky);
  font-weight: bold;
  font-size: 14px;
  padding: 4px;
`;

const Line = styled.div`
  height: 1px;
  background-color: rgb(120, 120, 120);
  width: 80%;
  margin: 2px 0;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  :hover {
    cursor: pointer;
  }
`;

const S = {
  Wrapper,
  Text,
  Line,
};
