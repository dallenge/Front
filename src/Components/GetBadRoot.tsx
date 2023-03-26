import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexColumnCenterCSS } from '../CSS/common';

function GetBadRoot() {
  return (
    <Wrapper>
      <Container>
        <Text size={'30px'}>
          <div>죄송합니다</div>
          <div>요청하신 페이지를 찾을 수 없습니다.</div>
        </Text>

        <Text color={'rgb(130, 130, 130)'}>
          <div>방문하시려는 페이지의 주소가 잘못 입력되었거나,</div>
          <div>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</div>
        </Text>
        <Text color={'rgb(130, 130, 130)'}>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</Text>
        <Text>
          <Link to="/">메인페이지로 이동하기</Link>
        </Text>
      </Container>
    </Wrapper>
  );
}
export default GetBadRoot;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  position: fixed;
`;

const Container = styled.div`
  height: 700px;
  ${FlexColumnCenterCSS}
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: ${({ size }: { size?: string }) => size};
  margin-bottom: 18px;
  color: ${({ color }: { color?: string }) => color};
`;
