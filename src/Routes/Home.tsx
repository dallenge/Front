import React from 'react';
import styled from 'styled-components';

const Card = styled.div<{ background: string; height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  background-size: cover;
`;
function Home() {
  return (
    <div>
      <Card background="url('/main.jpg')" height="80vh">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '150px',
            color: 'black',
            fontSize: '70px',
          }}
        >
          <div>타인에게 공유하는</div>
          <div>나만의 챌린지</div>
          <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>나만의 데일리 챌린지를</div>
          <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>사람들에게 공유하세요!</div>
        </div>
      </Card>
      <Card background="white" height="50vh">
        카테고리 넣을 위치입니다.
      </Card>
      <Card background="var(--color-white)" height="600px">
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>인기 챌린지</div>
          <div style={{ width: '100%', display: 'flex', marginTop: '50px', justifyContent: 'space-around' }}>
            <PopularChallenge></PopularChallenge>
            <PopularChallenge></PopularChallenge>
            <PopularChallenge></PopularChallenge>
            <PopularChallenge></PopularChallenge>
          </div>
        </div>
      </Card>
    </div>
  );
}
function PopularChallenge() {
  return (
    <div
      style={{
        height: '500px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px',
      }}
    >
      <div style={{ height: '250px', width: '280px', background: 'var(--color-sky)', borderRadius: '10px' }}></div>
      <div style={{ marginTop: '20px' }}>인기 챌린지 입니다.</div>
    </div>
  );
}

export default Home;
