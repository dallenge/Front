import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SpreadMenu({ setOpen }: { setOpen: SetOpenFunc }) {
  const navigate = useNavigate();
  return (
    <SpreadMenuBox>
      <Layer>
        <SpreadDiv>관심있는 챌린지</SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv>내가 시작한 챌린지</SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv>내가 쓴 후기</SpreadDiv>
      </Layer>
      <Layer>
        <Line></Line>
      </Layer>
      <Layer>
        <SpreadDiv
          onClick={() => {
            navigate('/my-page/modify/profile-edit');
            setOpen(); // 페이지 이동하면 스프레드 메뉴 닫히도록
          }}
        >
          회원정보 수정
        </SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          로그아웃
        </SpreadDiv>
      </Layer>
    </SpreadMenuBox>
  );
}

export default SpreadMenu;

const SpreadMenuBox = styled.div`
  padding: 15px;
  position: absolute;
  z-index: 999;
  width: 240px;
  height: 250px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  right: 40px;
  top: 110px;
`;

const Layer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 0;
`;

const SpreadDiv = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 80%;
  background: rgb(200, 200, 200);
`;

interface SetOpenFunc {
  (): void;
}
