import { useNavigate } from 'react-router-dom';
import S from '../../CSS/Home-style';

import { BsCardHeading } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { GiAchievement } from 'react-icons/gi';

function Icons() {
  const navigate = useNavigate();

  return (
    <S.IconWrapper>
      <S.IconContainer onClick={() => navigate('/login')}>
        <S.IconBox>
          <BiLogIn size={50} />
        </S.IconBox>
        <S.Text>로그인</S.Text>
      </S.IconContainer>
      <S.IconContainer onClick={() => navigate('/challengelist')}>
        <S.IconBox>
          <BsCardHeading size={50} />
        </S.IconBox>
        <S.Text>목록</S.Text>
      </S.IconContainer>
      <S.IconContainer onClick={() => navigate('/get-recommendations')}>
        <S.IconBox>
          <HiOutlineSparkles size={50} />
        </S.IconBox>
        <S.Text>추천받기</S.Text>
      </S.IconContainer>
      <S.IconContainer onClick={() => navigate('/achievement')}>
        <S.IconBox>
          <GiAchievement size={50} />
        </S.IconBox>
        <S.Text>성취</S.Text>
      </S.IconContainer>
    </S.IconWrapper>
  );
}
export default Icons;
