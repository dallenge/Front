import styled from 'styled-components';

function CommnetBox() {
  return (
    <>
      <Container>
        <WriteFrom>
          <Textarea placeholder="댓글 작성"></Textarea>
          <div style={{ display: 'flex', justifyContent: 'right', width: '80%', marginLeft: '147px' }}>
            <Button>댓글 쓰기</Button>
          </div>
        </WriteFrom>
      </Container>
    </>
  );
}
export default CommnetBox;

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  border: 1px solid rgb(208, 208, 208);
  box-shadow: 2px 2px 3px rgb(200, 200, 200);
  border-radius: 2px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WriteFrom = styled.div`
  width: 98%;
  height: 200px;
  background-color: var(--color-sky);
  align-items: center;
  padding: 30px 0;
`;
const Textarea = styled.textarea`
  font-size: 18px;
  width: 80%;
  height: 90%;
  resize: none;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const Button = styled.button`
  border: none;
  font-weight: 600;
  background-color: var(--color-blue);
  color: #ffffff;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    background-color: #599ff5;
  }
`;
