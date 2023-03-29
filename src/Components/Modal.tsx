import styled from 'styled-components';
import { HoverCSS, ModalBackgroundSetCSS, ModalCSS } from '../CSS/common';
import { RxCross1 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import { isAlertModalAtom } from '../Atoms/modal.atom';

interface Props {
  content: string;
}

function AlertModal({ content }: Props) {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const setIsAlertModal = useSetRecoilState(isAlertModalAtom);

  useEffect(() => {
    if (content.includes('토큰')) {
      setAlertMessage('다시 로그인 후 이용해주세요 :)');
    }
  }, []);

  const onClickExpireTokenAfterReLogin = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <div>Dallenge</div>
        <div>{alertMessage && '죄송합니다'}</div>
        <div>{alertMessage ? alertMessage : content}</div>
        <div onClick={onClickExpireTokenAfterReLogin}>{alertMessage && '다시 로그인 하러가기'}</div>
      </S.Container>
      <S.IconBox onClick={() => setIsAlertModal(false)}>
        <RxCross1 size={35} />
      </S.IconBox>
    </S.Wrapper>
  );
}
export default AlertModal;

const Wrapper = styled.div`
  ${ModalBackgroundSetCSS}
`;
const Container = styled.div`
  ${ModalCSS}
  width: 500px;
  height: 300px;
  padding: 0 80px;
  & > div:first-child {
    color: var(--color-blue);
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 45px;
  }
  & > div:last-child {
    margin-top: 20px;
    border-bottom: 1px solid black;
    :hover {
      ${HoverCSS}
      color: var(--color-blue);
      border-bottom: 1px solid var(--color-blue);
    }
  }
`;
const IconBox = styled.div`
  position: relative;
  left: 226px;
  top: -126px;
  z-index: 99999999;
  ${HoverCSS}
`;

const S = { Wrapper, Container, IconBox };
