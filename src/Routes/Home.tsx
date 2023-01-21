import React from 'react';
import styled from 'styled-components';

const Card = styled.div<{ backgroundColor: string; height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  padding: 20px;
  display: flex;
  justify-content: flex-start;
`;

const PopularChallenge = styled.div`
  height: 400px;
  width: 18rem;
  border: 1px solid var(--color-blue);
  background: var(--color-sky);
`;

function Home() {
  return (
    <div>
      <Card backgroundColor="white" height="90vh">
        1
      </Card>
      <Card backgroundColor="var(--color-white)" height="90vh">
        2
      </Card>
      <Card backgroundColor="white" height="600px">
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

export default Home;
