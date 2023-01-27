import '../CSS/PostList.css';
import styled from 'styled-components';

const CategoryBtn = styled.div`
  width: 100px;
  height: 50px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const PostContainer = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 20px;
  row-gap: 50px;
`;
const PostBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  background: var(--color-white);
  padding: 20px;
  border-radius: 10px;
`;

export default function PostList() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
        <CategoryBtn className="checked">전체</CategoryBtn>
        <CategoryBtn>카테고리1</CategoryBtn>
        <CategoryBtn>카테고리2</CategoryBtn>
        <CategoryBtn>카테고리3</CategoryBtn>
        <CategoryBtn>카테고리4</CategoryBtn>
      </div>
      <PostContainer>
        <div
          style={{
            width: '300px',
            height: '300px',
            background: 'var(--color-sky)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            borderRadius: '10px',
          }}
        >
          <img src="/main.jpg" alt="noimage" style={{ width: '260px', height: '180px', objectFit: 'cover' }} />
          <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>하루 계획 모두 실천하기</div>
          <div
            style={{
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'absolute',
              bottom: '20px',
            }}
          >
            <div>상세보기</div>
            <div>시간 : 00.00.00 00:00:00</div>
          </div>
        </div>
        <PostBox />
        <PostBox />
        <PostBox />
        <PostBox />
        <PostBox />
      </PostContainer>
    </div>
  );
}
