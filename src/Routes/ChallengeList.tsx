import '../CSS/PostList.css';
import styled from 'styled-components';
import URL from '../Url';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANT_INFO from '../Constant/Constant';

const CategoryBtn = styled.div`
  width: 100px;
  height: 30px;
  margin-right: 50px;
  display: flex;
  font-weight: bold;
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
const Challenge = styled.div`
  width: 300px;
  height: 300px;
  background: var(--color-sky);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  // background: var(--color-sky);
  height: 100px;
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
  & focus-visible {
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

export default function ChallengeList() {
  type challenge = {
    id: number;
    title: string;
    challengeCategory: string;
    challengeLocation: string;
    challengeDuration: string;
    howManyUsersAreInThisChallenge: number;
    challengeImgUrl: string;
  };
  const navigate = useNavigate();
  const SEARCH_IMAGE_URL = CONSTANT_INFO.IMAGE_URL.SEARCH_IMAGE_URL;
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [challengeArray, setChallengeArray] = useState<challenge[]>([]);
  const [titleParams, setTitleParams] = useState<string | undefined>('');

  const { title, category } = useParams();
  const categoryList = [undefined, '공부', '봉사', '운동', '경제', '건강'];

  const pageLoop = () => {
    let pageItem = [];
    let n = Math.floor(page / 10);
    for (let i = n * 10; i < (n + 1) * 10 && i < totalPage; i++) {
      if (page === i) pageItem.push(<Pagination.Item active>{i + 1}</Pagination.Item>);
      else
        pageItem.push(
          <Pagination.Item
            onClick={() => {
              setPage(i);
            }}
          >
            {i + 1}
          </Pagination.Item>,
        );
    }
    return pageItem;
  };

  const getChallenges = useCallback(async () => {
    const config = {
      method: 'get',
      url: `${URL}/challenge/condition?title=${title ?? ''}&category=${category ?? ''}&size=8&page=${page}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    await axios(config)
      .then((res) => {
        setChallengeArray([...res.data.content]);
        setTotalPage(Math.ceil(res.data.totalElements / 8));
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    if (!category) {
      window.location.href = `/challengelist/${searchText}`;
    } else {
      window.location.href = `/challengelist/${searchText}/${category}`;
    }
  };

  useEffect(() => {
    if (title === undefined) {
      setSearchText('');
    } else {
      setSearchText(`${title}`);
    }
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
        {categoryList.map((e) => {
          return (
            <CategoryBtn
              className={category === e ? 'checked' : undefined}
              onClick={() => {
                window.location.href = `/challengelist//${e ?? ''}`;
              }}
            >
              {e === undefined ? '전체' : e}
            </CategoryBtn>
          );
        })}
      </div>
      <InputContainer>
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
      </InputContainer>
      <PostContainer>
        {challengeArray.map((challenge, i) => {
          return (
            <Challenge key={i}>
              <img
                src={URL + challenge.challengeImgUrl}
                alt="noimage"
                style={{ width: '260px', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>{challenge.title}</div>
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
            </Challenge>
          );
        })}
      </PostContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px',
        }}
      >
        <Pagination>
          <Pagination.First
            onClick={() => {
              setPage(0);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              if (page !== 0) setPage(page - 1);
            }}
          />
          {pageLoop()}
          <Pagination.Next
            onClick={() => {
              if (page !== totalPage - 1) setPage(page + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPage(totalPage - 1);
            }}
          />
        </Pagination>
      </div>
    </div>
  );
}
