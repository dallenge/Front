import styled from 'styled-components';

interface Props {
  writer: string;
  text: string;
  time: string;
}

function Comment(props: Props) {
  const { writer, text, time } = props;

  return (
    <Container>
      <Box>
        <WriterText>{writer}</WriterText>
        <TimeText>{time}</TimeText>
      </Box>
      <Box>
        <CommentText>{text}</CommentText>
      </Box>
    </Container>
  );
}
export default Comment;

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  border: 1px solid rgb(208, 208, 208);
  background-color: #ffffff;
  border-radius: 7px;
  padding: 10px;
  margin: 20px auto;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;
const WriterText = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
`;
const TimeText = styled.div`
  display: inline-block;
  font-size: 14px;
  color: rgb(88, 88, 88);
  margin-left: 30px;
`;
const CommentText = styled.div`
  font-size: 18px;
`;
