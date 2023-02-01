import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';
import URL from '../Url';

const InputContainer = styled.div`
  background: var(--color-sky);
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  font-weight: bold;
  font-size: 20px;
  width: 800px;
  height: 43px;
  border-radius: 33px;
  padding: 30px;
  margin-left: 20px;
  border: 2px solid var(--color-blue);
  &: focus-visible {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: 20px;
  display: none;
`;

const Image = styled.img`
  width: 30px;
`;

function SearchPage() {
  const SEARCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SEARCH_IMAGE_URL;
  const [searchText, setSearchText] = useState<string>('');

  interface Content {
    id: number;
    title: String;
    challengeCategory: String;
    challengeLocation: String;
    challengeDuration: String;
    challengeImgUrl: String;
    howManyUsersAreInThisChallenge: number;
    challengeOwnerUser: { userName: String; email: String; userId: number };
  }
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const decodeText = decodeURI(window.location.href);
    const textIdx = decodeText.indexOf('=');

    const text = decodeText.slice(textIdx + 1, decodeText.length);

    setSearchText(text);

    const data = JSON.stringify({
      title: searchText,
      category: '',
      page: 0,
      size: 20,
    });

    const config = {
      method: 'get',
      url: `${URL}/challenge/condition?title=${text}&category=&page=0&size=20`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then((res) => {
        console.log(res.data.content);
        setContents(res.data.content);
      })
      .catch((err) => console.trace(err));
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  const onClickSearch = () => {};

  return (
    <div>
      <InputContainer>
        <form>
          <Image src={SEARCH_IMAGE_URL} />
          <Input
            type="text"
            name="search"
            value={searchText}
            autoSave="off"
            placeholder="관심있는 챌린지명을 검색해보세요!"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          ></Input>
          <Button onClick={onClickSearch}>검색</Button>
        </form>
      </InputContainer>
    </div>
  );
}

const P = styled.p`
  display: inline-block;
  &:hover {
    cursor: pointer;
    border-bottom: 1px solid rgb(97, 97, 97);
  }
`;

function NoSearchView() {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: '120px' }}>
      <p style={{ fontSize: '100px' }}>🧘🏻</p>
      <p style={{ fontSize: '22px', fontWeight: 'bold' }}>일치하는 검색 결과가 없습니다</p>
      <p style={{ marginTop: '30px', fontSize: '16px', fontWeight: 'bold', color: 'rgb(97, 97, 97' }}>
        원하는 챌린지가 없으세요?
      </p>
      <P
        onClick={() => navigate('/createchallenge')}
        style={{ marginTop: '-16px', fontSize: '16px', fontWeight: 'bold', color: 'rgb(97, 97, 97' }}
      >
        직접 나만의 챌린지를 만들어보세요!
      </P>
    </div>
  );
}

export default SearchPage;
