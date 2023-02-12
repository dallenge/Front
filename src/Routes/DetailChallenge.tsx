import styled from 'styled-components';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import CommentBox from '../Components/Comment/CommentBox';
import Comment from '../Components/Comment/Comment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../Url';
import GetBadRoot from '../Components/GetBadRoot';

function DetailChallenge() {
  const { id } = useParams();
  const [challengeInfo, setChallengeInfo] = useState<Challenge>();
  const [isBadRoot, setIsBadRoot] = useState<boolean>(false);

  interface Challenge {
    responseChallenge: {
      id: string;
      title: string;
      content: string;
      challengeCategory: string;
      challengeLocation: string;
      challengeDuration: string;
      created_at: string;
      challengeImgUrls: string[];
      howManyUsersAreInThisChallenge: number;
      challengeOwnerUser: {
        userName: string;
        email: string;
        userId: number;
      };
    };
    responseUserChallenges: {
      challengeStatus: string;
      participatedUser: {
        userName: string;
        email: string;
        userId: number;
      };
    }[];
  }

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${URL}/challenge/${id}`,
    };

    axios(config)
      .then((res) => {
        setChallengeInfo(res.data);
      })
      .catch((err) => {
        setIsBadRoot(true);
      });
  }, []);

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
    <>
      {!isBadRoot && challengeInfo ? (
        <Container>
          <ContentBox>
            <ImageBox src={challengeInfo.responseChallenge.challengeImgUrls[0]} />
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
                  {challengeInfo.responseChallenge.title}
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
                    <Text>🙋 {challengeInfo.responseChallenge.content}</Text>
                  </TextFrame>
                  <TextFrame>
                    <Text>🕒 {challengeInfo.responseChallenge.challengeDuration}</Text>
                  </TextFrame>
                  <TextFrame>
                    <Text>📍 {challengeInfo.responseChallenge.challengeLocation}</Text>
                  </TextFrame>
                  <TextFrame>
                    {/* <Text style={{ marginTop: '100px', fontSize: '17px', color: 'rgb(88, 88, 88)' }}>
                  {challengeInfo.challengeCategory}
                </Text> */}
                  </TextFrame>
                  <TextFrame style={{ justifyContent: 'left', marginTop: '20px' }}>
                    <HoverSpan>
                      {heart ? (
                        <RiHeart3Fill size={28} color={'#ff0000'} onClick={onClickHeart} />
                      ) : (
                        <RiHeart3Line size={28} onClick={onClickHeart} />
                      )}
                    </HoverSpan>
                    {/* <BottomText>{challengeInfo.challengeLikeCount}</BottomText> */}
                    <BottomText> 참여중 {challengeInfo.responseChallenge.howManyUsersAreInThisChallenge}</BottomText>
                  </TextFrame>
                </InnerBox>
              </TextBox>
              <div style={{ display: 'inline-block', marginLeft: '25px', width: '630px' }}>
                <Button onClick={onclickGetStart}>바로 참여하기</Button>
              </div>
            </div>
          </ContentBox>
          {/* <div style={{ float: 'left', marginTop: '20px' }}>댓글({challengeInfo.challengeCommnetCount})</div> */}
          <div style={{ marginTop: '30px' }}>
            <>
              <CommentBox />
              {/* <div style={{ padding: '20px 0', margin: '30px 0' }}>
            {challengeInfo.comments.map((comment) => {
              return <Comment writer={comment.writer} text={comment.text} time={comment.time} />;
            })}
          </div> */}
            </>
          </div>
        </Container>
      ) : (
        <GetBadRoot />
      )}
    </>
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
