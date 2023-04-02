import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { FlexCenterCSS, FlexColumnCenterCSS, HoverCSS } from '../../../CSS/common';

interface Props {
  onClickToggleModal: () => void;
  url: string;
  name: string;
}

function AchieveModal({ onClickToggleModal, url, name }: Props) {
  return (
    <S.ModalContainer>
      <S.DialogBox>
        <S.IconBox onClick={() => onClickToggleModal()}>
          <AiOutlineClose size={30} />
        </S.IconBox>
        <S.Image src={`${process.env.REACT_APP_URL}/${url}`} alt="" />
        <S.Text>{name} !</S.Text>
        <S.SmallText>획득한 뱃지는 성취 페이지에서 확인할 수 있습니다 :)</S.SmallText>
        <S.LinkText onClick={() => (window.location.href = '/achievement')}>성취 페이지에서 확인하기</S.LinkText>
      </S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
}
export default AchieveModal;

const ModalContainer = styled.div`
  ${FlexCenterCSS}
  position: fixed;
  width: 100%;
  height: 100%;
  top: 30px;
  z-index: 9999;
`;

const DialogBox = styled.dialog`
  ${FlexColumnCenterCSS}
  width: 800px;
  height: 480px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const Text = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const SmallText = styled.div`
  margin-top: 40px;
  font-size: 19px;
  color: rgb(180, 180, 180);
`;

const LinkText = styled.div`
  font-size: 16px;
  color: rgb(180, 180, 180);
  ${HoverCSS}
  border-bottom: 1px solid rgb(180, 180, 180);
  :hover {
    color: rgb(120, 120, 120);
  }
`;

const IconBox = styled.div`
  display: inline-block;
  margin-left: auto;
  ${HoverCSS}
`;

const S = { ModalContainer, DialogBox, Backdrop, Image, Text, SmallText, LinkText, IconBox };
