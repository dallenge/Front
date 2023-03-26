import React from 'react';
import styled from 'styled-components';
import Modify from '../../Components/Modify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from '../../Url';

const WithdrawalBtn = styled.button`
  border: 2px solid var(--color-blue);
  color: var(--color-blue);
  border-radius: 6px;
  background: #ffffff;
  line-height: 50px;
  width: 130px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: rgba(63, 114, 175, 0.1);
  }
`;

const Container = styled.div`
  text-align: center;
  justify-content: center;
  display: inline-block;
  width: 1200px;
  overflow: hidden;
`;

export default function Withdrawal() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const deleteUser = async () => {
    const config = {
      method: 'delete',
      url: `${URL}/user/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    await axios(config)
      .then(() => {
        alert('탈퇴가 완료되었습니다.');
        navigate('/');
        localStorage.clear();
      })
      .catch((err) => {
        alert(JSON.parse(err.request.response).message);
      });
  };
  return (
    <div style={{ marginBottom: '250px' }}>
      <Modify active={'withdrawal'} />
      <div style={{ height: '80px' }}></div>
      <Container>
        <div style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(38, 38, 38)' }}>
          정말 델린지를 탈퇴하시겠어요?
        </div>
        <div style={{ height: '15px' }}></div>
        <div style={{ fontSize: '15px', color: 'rgb(50, 50, 50)', fontWeight: '600' }}>
          <div>계정을 탈퇴하면 계정 정보 및서비스 이용 기록 등 모든 정보가 삭제됩니다.</div>
          <div>탈퇴된 계정 정보와 서비스 이용 기록 등은복구할 수 없으니 신중하게 선택해주시기 바랍니다.</div>
        </div>
        <div style={{ height: '30px' }}></div>
        <WithdrawalBtn onClick={deleteUser}>회원 탈퇴</WithdrawalBtn>
      </Container>
    </div>
  );
}
