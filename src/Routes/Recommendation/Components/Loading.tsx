import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

function Loading() {
  return (
    <S.Container>
      <BeatLoader color={'var(--color-blue)'} size={30} />
    </S.Container>
  );
}
export default Loading;

const Container = styled.div`
  width: 80%;
  height: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const S = { Container };
