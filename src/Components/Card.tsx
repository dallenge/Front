import React from 'react';
import styled, { keyframes } from 'styled-components';

const URL = process.env.REACT_APP_URL;

function ChallengeCard({ id, title, content, img }: Props) {
  return (
    <S.Wrapper
      title="클릭 시 해당 챌린지 페이지로 이동합니다"
      onClick={() => (window.location.href = `/challenge/${id}`)}
    >
      <S.Box>
        <S.Img src={img.length != 0 ? `${URL}` + `${img[0]}` : `/logo.png`} />
        <S.Title>{title}</S.Title>
        <S.Line />
        <S.Text>{content}</S.Text>
      </S.Box>
    </S.Wrapper>
  );
}
export default ChallengeCard;

const Wrapper = styled.div`
  width: 30%;
  min-height: 400px;
  margin: 5px;
  background-color: #f1f6ff;
  border: 2px solid var(--color-sky);
  border-radius: 20px;
  margin: 8px auto;
  :hover {
    cursor: pointer;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 30px 50px 24px 50px;
`;

const Img = styled.img`
  width: 100%;
  margin: 0 auto;
  max-height: 250px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const Text = styled.div`
  font-size: 15px;
`;

const Line = styled.div`
  height: 1px;
  background-color: rgb(210, 210, 210);
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const S = { Wrapper, Box, Img, Title, Line, Text };

interface Props {
  id: number;
  title: string;
  content: string;
  img: string[];
}
