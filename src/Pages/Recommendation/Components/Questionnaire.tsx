import styled from 'styled-components';
import { FlexBetweenCSS } from '../../../CSS/common';

function Questionnaire({ question, answers, onNext }: Props) {
  return (
    <>
      <S.QuestionText>{question}</S.QuestionText>
      <S.Box>
        {answers.map((answer, idx) => (
          <S.Button key={idx} onClick={() => onNext(idx)}>
            {answer}
          </S.Button>
        ))}
      </S.Box>
    </>
  );
}
export default Questionnaire;

const QuestionText = styled.div`
  font-size: 33px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Box = styled.div`
  ${FlexBetweenCSS}
  align-items: center;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  margin: 0 auto;
  height: 70px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 22px;
  background-color: var(--color-sky);
  border-radius: 10px;
  padding: 0 20px;
  :hover {
    cursor: pointer;
    background-color: #afc3e9;
    transition: all 0.1s ease-in-out;
  }
`;

const S = { QuestionText, Box, Button };

interface Props {
  question: string;
  answers: string[];
  onNext: (idx: number) => void;
}
