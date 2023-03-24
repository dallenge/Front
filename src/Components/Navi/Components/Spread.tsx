import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SpreadMenu({ setOpen }: { setOpen: SetOpenFunc }) {
  const navigate = useNavigate();
  return (
    <SpreadMenuBox>
      <Layer>
        <SpreadDiv
          onClick={() => {
            navigate('/bookmark');
            setOpen();
          }}
        >
          북마크 한 챌린지
        </SpreadDiv>
      </Layer>
      <Layer>
        <SpreadDiv
          onClick={() => {
            navigate('/comment');
            setOpen();
          }}
        >
          내가 쓴 후기
        </SpreadDiv>
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
  display: flex;
  flex-direction: column;
  z-index: 999;
  width: 240px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  right: 40px;
  top: 110px;
`;

const Layer = styled.div`
  width: 100%;
  margin: 8px auto;
`;

const SpreadDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(190, 190, 190);
`;

interface SetOpenFunc {
  (): void;
}
