import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Regex from '../../Constant/Regex';
import { FlexAlignCSS, FlexColumnCenterCSS } from '../../CSS/common';

interface Input {
  email: string;
}

function FindPw() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  const onSubmitTemporaryPw = () => {};

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmitTemporaryPw)}>
        <S.Title>비밀번호 찾기</S.Title>
        <input
          placeholder="이메일을 입력해주세요"
          autoComplete="off"
          autoSave="off"
          {...register('email', {
            required: { value: true, message: '* 이메일을 입력해주세요' },
            pattern: {
              value: Regex.email,
              message: '* 이메일 형식에 맞게 입력해주세요',
            },
          })}
        />
        {errors.email && <S.Alert>{errors.email.message}</S.Alert>}
        <button>임시 비밀번호 보내기</button>
      </S.Form>
    </S.Wrapper>
  );
}
export default FindPw;

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  ${FlexAlignCSS}
  background-color: rgb(245, 245, 245);
`;

const Form = styled.form`
  width: 25%;
  padding: 60px 10px 30px;
  margin: 0 auto;
  ${FlexColumnCenterCSS}
  background-color: rgb(254, 254, 254);

  & > input {
    border: none;
    padding: 10px;
    margin: 0 auto;
    font-size: 18px;
    width: 80%;
    border-bottom: 1px solid var(--color-blue);
    :focus-visible {
      outline: none;
    }
  }

  & > button {
    border: none;
    background-color: #d8dfec;
    border-radius: 20px;
    width: 80%;
    margin: 80px auto 20px;
    padding: 10px;
    font-weight: bold;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Alert = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: rgb(228, 15, 15);
  margin-top: 10px;
`;

const S = {
  Wrapper,
  Form,
  Title,
  Alert,
};
