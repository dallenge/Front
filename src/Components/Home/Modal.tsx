import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { RxCross1 } from 'react-icons/rx';
import { ModalBackgroundSetCSS, ModalCSS } from '../../CSS/common';

interface Props {
  setOpen: (isOpen: boolean) => void;
}

function AccessModal({ setOpen }: Props) {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo>Dallenge</S.Logo>
        <S.Text>
          로그인을 하면 <br />더 많은 서비스를 이용할 수 있어요!
        </S.Text>
        <S.Button onClick={() => navigate('/login')}>로그인 하러가기</S.Button>
        <S.Button onClick={() => navigate('/signup/select-account')}>회원가입 하러가기</S.Button>
      </S.Container>
      <S.IconBox onClick={() => setOpen(false)}>
        <RxCross1 size={35} />
      </S.IconBox>
    </S.Wrapper>
  );
}
export default AccessModal;

const Wrapper = styled.div`
  ${ModalBackgroundSetCSS}
`;

const Container = styled.div`
  ${ModalCSS}
  width: 450px;
  height: 450px;
`;

const Logo = styled.div`
  color: var(--color-blue);
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 80px;
`;

const Button = styled.button`
  border: none;
  width: 300px;
  height: 40px;
  font-weight: bold;
  margin: 10px;
  background-color: #d5e4ff;
  :hover {
    background-color: #c4d9ff;
  }
`;

const IconBox = styled.div`
  position: relative;
  left: 248px;
  top: -206px;
  :hover {
    cursor: pointer;
  }
`;

const S = { Wrapper, Container, Logo, Button, Text, IconBox };
