import styled from 'styled-components';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface Props {
  content: string;
  likes: number;
  createdAt: {
    fewYearsAge: number;
    fewMonthAgo: number;
    fewDaysAgo: number;
  };
  img: string[];
  owner: {
    userName: string;
    email: string;
    userId: number;
  };
  myComment: boolean;
}

function Comment(props: Props) {
  const URL = process.env.REACT_APP_URL;

  const { content, likes, createdAt, img, owner, myComment } = props;

  const getFewDaysAgo = (fewDayObject: { fewYearsAge: number; fewMonthAgo: number; fewDaysAgo: number }) => {
    if (fewDayObject.fewYearsAge !== 0) {
      return fewDayObject.fewYearsAge + '년 전';
    }
    if (fewDayObject.fewMonthAgo !== 0) {
      return fewDayObject.fewMonthAgo + '월 전';
    }
    if (fewDayObject.fewDaysAgo !== 0 && fewDayObject.fewDaysAgo !== 1) {
      return fewDayObject.fewDaysAgo + '일 전';
    }
    if (fewDayObject.fewDaysAgo === 1) {
      return '어제';
    }
    if (fewDayObject.fewDaysAgo === 0) {
      return '오늘';
    }
  };

  return (
    <S.Wrapper>
      <S.Text>
        <S.Text size={'18px'}>{owner.userName}</S.Text>
        <S.Text size={'14px'} style={{ color: 'rgb(150, 150, 150)', marginLeft: '20px' }}>
          {getFewDaysAgo(createdAt)}
        </S.Text>
        {myComment && (
          <S.HoverText style={{ marginLeft: 'auto' }}>
            <BiDotsHorizontalRounded size={35} />
          </S.HoverText>
        )}
      </S.Text>
      <S.Form>
        <S.Text>{img.length !== 0 && <S.Image src={`${URL}` + `${img}`} />}</S.Text>
        <S.ContentText>{content}</S.ContentText>
      </S.Form>
    </S.Wrapper>
  );
}
export default Comment;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding-bottom: 40px;
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-top: 30px;
`;

const Text = styled.div<{ size?: string }>`
  display: flex;
  align-items: center;
  font-size: ${({ size }) => size};
  font-weight: bold;
`;

const HoverText = styled(Text)`
  :hover {
    cursor: pointer;
  }
`;

const ContentText = styled(Text)`
  align-items: initial;
  margin: 20px 0 20px 30px;
`;

const Form = styled.div`
  display: flex;
  padding: 10px 20px;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 200px;
`;

const S = {
  Wrapper,
  Text,
  Image,
  Form,
  HoverText,
  ContentText,
};
