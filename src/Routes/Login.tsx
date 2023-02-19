import { useState } from 'react';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../Url';

const LoginContainer = styled.div`
  text-align: center;
  justify-content: center;
  margin: auto 0;
  display: inline-block;
  width: 320px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  font-size: 15px;
  &:focus {
    outline: 1px solid var(--color-blue);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-weight: 700;
`;

const DivHover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SignupDiv = styled.div`
  color: var(--color-blue);
  font-weight: 600;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: rgba(63, 114, 175, 0.1);
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  const onChangeId = (e: any) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value)) {
      setIdError(false);
    } else {
      setIdError(true);
    }
    setId(e.target.value);
  };

  const onChangePw = (e: any) => {
    if (!e.target.value || e.target.value.length >= 8) {
      setPwError(false);
    } else {
      setPwError(true);
    }
    setPw(e.target.value);
  };

  const doLogin = async () => {
    const data = JSON.stringify({
      email: id,
      password: pw,
    });

    const config = {
      method: 'post',
      url: `${URL}/user/login`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios(config)
      .then((res) => {
        window.history.back();
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expire', (Date.now() + 7200000).toString());
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('email', id);
      })
      .catch((err) => {
        alert(JSON.parse(err.request.response).message);
      });
  };
  return (
    <div>
      <div style={{ marginTop: '70px' }}></div>
      <LoginContainer>
        <div style={{ fontSize: '30px', lineHeight: '40px', fontWeight: '700' }}>로그인</div>
        <div style={{ marginTop: '20px' }}>
          <div>
            <Input type="text" placeholder="아이디를 입력해주세요" autoSave="off" onChange={onChangeId}></Input>
            {idError && <ValidationView text={'이메일 형식에 맞게 입력해 주세요'} onChange={onChangeId} />}

            <Input type="password" placeholder="비밀번호를 입력해주세요" autoSave="off" onChange={onChangePw}></Input>
            {pwError && <ValidationView text={'비밀번호를 8자 이상 입력해주세요'} />}
          </div>
          <div style={{ marginTop: '13px' }}>
            <Button style={{ background: 'var(--color-blue)', color: 'white' }} onClick={doLogin}>
              로그인
            </Button>
          </div>
          <div style={{ marginTop: '4px' }}>
            <DivHover
              style={{
                fontSize: '14px',
                float: 'right',
                display: 'inline-block',
                color: 'var(--color-blue)',
                fontWeight: '600',
              }}
            >
              비밀번호 찾기
            </DivHover>
          </div>
          <div style={{ marginTop: '60px' }}>
            <DivHover
              style={{ marginTop: '20px', background: '#F7E600', width: '100%', height: '50px', borderRadius: '6px' }}
            >
              <div style={{ paddingTop: '6px', display: 'flex' }}>
                <RiKakaoTalkFill style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
                <div
                  style={{
                    display: 'inline-block',
                    lineHeight: '36px',
                    width: '250px',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  카카오로 로그인
                </div>
              </div>
            </DivHover>
            <DivHover
              style={{
                marginTop: '10px',
                background: '#ffffff',
                width: '100%',
                height: '50px',
                borderRadius: '6px',
                border: '1px solid #bcbcbc',
              }}
            >
              <div style={{ paddingTop: '6px', display: 'flex' }}>
                <FcGoogle style={{ marginLeft: '10px', width: '36px', height: '36px' }} />
                <div
                  style={{
                    display: 'inline-block',
                    lineHeight: '36px',
                    width: '250px',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  구글로 로그인
                </div>
              </div>
            </DivHover>
          </div>
          <div style={{ marginTop: '40px', width: '100%', height: '1px', backgroundColor: '#E1E1E1' }}></div>
          <div style={{ marginTop: '30px', fontSize: '13px', fontWeight: '600' }}>아직 델린지 회원이 아니신가요?</div>
          <DivHover
            style={{
              border: '1px solid var(--color-blue)',
              borderRadius: '6px',
              lineHeight: '42px',
              marginTop: '10px',
            }}
          >
            <SignupDiv onClick={() => navigate('/signup/select-account')}>델린지 회원가입 하기</SignupDiv>
          </DivHover>
        </div>
      </LoginContainer>
    </div>
  );
}

const ValidationView = (props: any) => {
  return (
    <div style={{ marginTop: '4px', marginBottom: '30px' }}>
      <div style={{ padding: '0 14px', fontSize: '13px', color: '#F00001', fontWeight: '600', float: 'left' }}>
        🔥{props.text}
      </div>
    </div>
  );
};
