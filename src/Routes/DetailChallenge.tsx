import styled from 'styled-components';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { useState } from 'react';
import CommentBox from '../Components/Comment/CommentBox';
import Comment from '../Components/Comment/Comment';

function DetailChallenge() {
  interface Challenge {
    id: number;
    title: string;
    content: string;
    challengeCategory: string;
    challengeLocation: string;
    challengeDuration: string;
    howManyUsersAreInThisChallenge: number;
    challengeImgUrl: string;
    challengeLikeCount: number;
    challengeCommnetCount: number;
    comments: { writer: string; text: string; time: string }[];
  }

  // --dummy--
  const challengeInfo: Challenge = {
    id: 1,
    title: '광합성 하기',
    content: '하루에 10분씩 광합성을 합니다!',
    challengeCategory: '#건강 #하루에10분',
    challengeLocation: '위치 상관없음',
    challengeDuration: '10분 내외',
    howManyUsersAreInThisChallenge: 10,
    challengeImgUrl: 'https://i.pinimg.com/736x/24/3b/12/243b12139666fbbc2474c4f8919dec9c.jpg',
    challengeLikeCount: 3,
    challengeCommnetCount: 5,
    comments: [
      {
        writer: '강성욱',
        text: '굳굳',
        time: '2023-02-07',
      },
      {
        writer: '박성욱',
        text: '오 좋다~',
        time: '2023-02-08',
      },
    ],
  };

  const [heart, setHeart] = useState<boolean>(false);

  const onClickHeart = () => {
    setHeart(!heart);
    // 서버에 post 및 화면 refresh
  };

  const onclickGetStart = () => {
    // 버튼에 text 변경
    // 서버에 post
  };

  return (
    <Container>
      <ContentBox>
        <ImageBox src={challengeInfo.challengeImgUrl} />
        <div>
          <TextBox>
            <div
              style={{
                display: 'inline-block',
                fontSize: '30px',
                fontWeight: '800',
                marginTop: '30px',
                justifyContent: 'left',
              }}
            >
              {challengeInfo.title}
            </div>
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--color-dark-blue)',
                width: '90%',
                margin: '0 auto',
                marginTop: '20px',
              }}
            ></div>
            <InnerBox>
              <TextFrame>
                <Text>🙋 {challengeInfo.content}</Text>
              </TextFrame>
              <TextFrame>
                <Text>🕒 {challengeInfo.challengeDuration}</Text>
              </TextFrame>
              <TextFrame>
                <Text>📍 {challengeInfo.challengeLocation}</Text>
              </TextFrame>
              <TextFrame>
                <Text style={{ marginTop: '100px', fontSize: '17px', color: 'rgb(88, 88, 88)' }}>
                  {challengeInfo.challengeCategory}
                </Text>
              </TextFrame>
              <TextFrame style={{ justifyContent: 'left', marginTop: '20px' }}>
                <HoverSpan>
                  {heart ? (
                    <RiHeart3Fill size={28} color={'#ff0000'} onClick={onClickHeart} />
                  ) : (
                    <RiHeart3Line size={28} onClick={onClickHeart} />
                  )}
                </HoverSpan>
                <BottomText>{challengeInfo.challengeLikeCount}</BottomText>
                <BottomText> 참여중 {challengeInfo.howManyUsersAreInThisChallenge}</BottomText>
              </TextFrame>
            </InnerBox>
          </TextBox>
          <div style={{ display: 'inline-block', marginLeft: '25px', width: '630px' }}>
            <Button onClick={onclickGetStart}>바로 참여하기</Button>
          </div>
        </div>
      </ContentBox>
      <div style={{ float: 'left', marginTop: '20px' }}>댓글({challengeInfo.challengeCommnetCount})</div>
      <div style={{ marginTop: '30px' }}>
        <>
          <CommentBox />
          <div style={{ padding: '20px 0', margin: '30px 0' }}>
            {challengeInfo.comments.map((comment) => {
              return <Comment writer={comment.writer} text={comment.text} time={comment.time} />;
            })}
          </div>
        </>
      </div>
    </Container>
  );
}
export default DetailChallenge;

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  justify-content: center;
  height: 100vh;
`;
const ContentBox = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 600px;
  border: 1px solid rgb(208, 208, 208);
  box-shadow: 2px 2px 3px rgb(200, 200, 200);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageBox = styled.img`
  display: inline-block;
  width: 450px;
`;
const TextBox = styled.div`
  width: 600px;
  height: 83%;
  margin-left: 40px;
  padding: 30px;
  background-color: var(--color-sky);
`;
const InnerBox = styled.div`
  margin-top: 30px;
  width: 85%;
`;
const TextFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 30px;
`;
const Text = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const BottomText = styled.span`
  font-size: 16px;
  margin-top: -4px;
  margin-right: 30px;
  font-weight: 600;
  margin-left: 3px;
`;
const Button = styled.button`
  border: none;
  width: 95%;
  height: 40px;
  font-weight: 600;
  background-color: var(--color-blue);
  color: #ffffff;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    background-color: #599ff5;
  }
`;
const HoverSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
