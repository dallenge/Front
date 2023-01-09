import React from 'react';
import styled from 'styled-components';

const Card = styled.div<{ backgroundColor: string }>`
  height: 90vh;
  background-color: ${(props) => props.backgroundColor};
`;
function Home() {
  return (
    <div>
      <Card backgroundColor="white">1</Card>
      <Card backgroundColor="var(--color-white)">2</Card>
      <Card backgroundColor="white">3</Card>
    </div>
  );
}

export default Home;
