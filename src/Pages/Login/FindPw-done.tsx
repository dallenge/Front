import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FindPwDone() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // 바로 로그인을 했다면 비밀번호를 변경할 수 있도록 navigate
    if (localStorage.getItem('token')) {
      navigate('/my-page/modify/password-edit');
    }
  }, []);

  useEffect(() => {
    if (location.state === null) {
      navigate('/');
    } else {
      setEmail(location.state.email);
    }
  }, []);

  return (
    <S.Wrapper>
      <S.Container>
        <div>임시 비밀번호를 메일로 발송했습니다.</div>
        <div>
          <div>이메일({email})로 임시 비밀번호를 발송하였습니다.</div>
          임시 비밀번호로 로그인 후 반드시 비밀번호를 재설정하시길 바랍니다.
          <br />
          혹시 임시 비밀번호 메일을 못 받으셨다면 재발송 버튼을 눌러주세요.
        </div>
        <button onClick={() => navigate('/login/find-password')}>임시 비밀번호 재발송</button>
      </S.Container>
    </S.Wrapper>
  );
}
export default FindPwDone;

const Wrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background-color: rgb(245, 245, 245);
`;

const Container = styled.div`
  width: 50%;
  padding: 60px 10px 30px;
  margin: 0 auto;
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(254, 254, 254);

  & > div:first-child {
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgb(210, 210, 210);
  }

  & > div > div {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  & > button {
    border: none;
    background-color: #d8dfec;
    border-radius: 20px;
    width: 80%;
    margin: 80px auto 20px;
    padding: 10px;
    font-weight: bold;
    :hover {
      background-color: #bfd2f6;
    }
  }
`;

const S = { Wrapper, Container };
