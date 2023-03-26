import styled from 'styled-components';
import { HoverCSS, ModalBackgroundSetCSS, ModalCSS } from '../../../CSS/common';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

interface Props {
  setOpen: (open: boolean) => void;
}

function DupliModal({ setOpen }: Props) {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Container>
        <div>요청하신 회원을 찾을 수 없습니다.</div>
        <S.Button onClick={() => navigate('/signup/select-account')}>회원가입 하러가기</S.Button>
      </S.Container>
      <S.IconBox onClick={() => setOpen(false)}>
        <RxCross1 size={23} />
      </S.IconBox>
    </S.Wrapper>
  );
}
export default DupliModal;

const Wrapper = styled.div`
  ${ModalBackgroundSetCSS}
`;

const Container = styled.div`
  ${ModalCSS}
  font-size: 18px;
  font-weight: bold;
  width: 500px;
  height: 180px;
  & > div {
    margin-top: 10%;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: auto;
  padding: 10px;
  background-color: #d8dfec;
  :hover {
    background-color: #bfd2f6;
  }
`;

const IconBox = styled.div`
  position: relative;
  left: 268px;
  top: -78px;
  ${HoverCSS}
`;

const S = { Wrapper, Container, Button, IconBox };
