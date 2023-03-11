import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FlexAlignCSS, FlexCenterCSS, HoverCSS } from '../../CSS/common';

const menus = [
  {
    title: '팀',
    content: [
      {
        content: '팀 소개',
        url: '',
      },
    ],
  },
  {
    title: '서비스',
    content: [
      {
        content: '목록',
        url: '/challengelist',
      },
      {
        content: '추천받기',
        url: '/get-recommendations',
      },
      {
        content: '성취',
        url: '/achievement',
      },
    ],
  },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Container>
        <div>
          <S.HoverText onClick={() => navigate('/')} style={{ fontSize: '26px', fontWeight: 'bold' }}>
            Dallenge
          </S.HoverText>
        </div>
        <S.Box>
          {menus.map((menu, idx) => (
            <div key={idx} style={{ padding: ' 0 20px' }}>
              <S.BoldText style={{ fontSize: '19px' }}>{menu.title}</S.BoldText>
              {menu.content.map((content, idx) => (
                <S.HoverText key={idx} onClick={() => navigate(content.url)}>
                  {content.content}
                </S.HoverText>
              ))}
            </div>
          ))}
        </S.Box>
      </S.Container>
      <S.Text style={{ marginTop: '20px' }}>Copyrightⓒ2023 Dallenge All rights reserved.</S.Text>
    </S.Wrapper>
  );
}
export default Footer;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: 0 20%;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  background-color: #fefefe;
  color: #808080;
  border-top: 1px solid #e6e6e6;
  padding-bottom: 60px;
`;

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #d4d4d4;
  padding-bottom: 50px;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 15px;
`;

const HoverText = styled(Text)`
  ${HoverCSS}
  margin-bottom: 3px;
`;

const BoldText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Box = styled.div`
  ${FlexAlignCSS}
  align-items: flex-start;
`;

const S = { Wrapper, Container, Text, HoverText, BoldText, Box };
