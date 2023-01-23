import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';

const SearchbarDiv = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 9999;
  height: 150px;
  width: 100%;
  background: #ffffff;
  top: 100px;
`;

const Input = styled.input`
  width: 60%;
  border: none;
  border-bottom: 1px solid rgb(209, 209, 209);
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
  color: rgb(97, 97, 97);
  &:focus-visible {
    outline: none;
  }
`;

const Image = styled.img`
  width: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const BottomDiv = styled.div`
  height: 1807.69px;
  opacity: 0.3;
  background-color: rgb(0, 0, 0);
`;

export default function Searchbar() {
  const SEARCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SEARCH_IMAGE_URL;
  return (
    <SearchbarDiv>
      <div style={{ height: '150px' }}>
        <div style={{ height: '40px' }}></div>
        <Input placeholder="관심있는 챌린지를 검색해보세요!"></Input>
        <Image src={SEARCH_IMAGE_URL} />
      </div>
      <BottomDiv></BottomDiv>
    </SearchbarDiv>
  );
}
