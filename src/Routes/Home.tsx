import React from 'react';
import styled from 'styled-components';
import PopularChallenge from '../Components/PopularChallenge';
import { useNavigate } from 'react-router-dom';

const Card = styled.div<{ background: string; height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  background-size: cover;
`;
const CategoryBtn = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0ecec;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: var(--color-sky);
    font-size: 25px;
  }
`;

const Category = ['공부', '봉사', '운동', '경제', '건강'];
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Card background="url('/main.jpg')" height="90vh">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '200px',
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
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          {Category.map((category) => {
            return (
              <CategoryBtn
                onClick={() => {
                  navigate(`/challengelist//${category}`);
                }}
              >
                {category}
              </CategoryBtn>
            );
          })}
        </div>
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

export default Home;
