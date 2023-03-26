import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthApi from '../../Apis/authApi';
import Regex from '../../Constant/Regex';
import DupliModal from './Components/Modal';
import { RxCross1 } from 'react-icons/rx';
import { FlexAlignCSS, FlexCenterCSS, FlexColumnCenterCSS, HoverCSS } from '../../CSS/common';
import { useNavigate } from 'react-router-dom';

interface Input {
  email: string;
}

function FindPw() {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Input>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onSubmitTemporaryPw = async () => {
    try {
      const { status } = await AuthApi.duplicatedEmailConfirm(watch('email'));
      if (status === 200) {
        // 가입되지 않은 이메일
        setIsOpenModal(true);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 409) {
        // 가입된 이메일
        const successEmail = getValues('email');
        try {
          await AuthApi.resetPassword(successEmail);
          navigate('/login/find-password-done', {
            state: {
              success: true,
              email: successEmail,
            },
          });
        } catch (err) {
          alert('잠시후 다시 시도해주세요');
        }
      }
    }
  };

  return (
    <S.Wrapper>
      {isOpenModal && <DupliModal setOpen={setIsOpenModal} />}
      <S.Form onSubmit={handleSubmit(onSubmitTemporaryPw)}>
        <S.Title>비밀번호 찾기</S.Title>
        <S.FlexLine>
          <S.Input
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
          <S.IconBox onClick={() => setValue('email', '')}>
            <RxCross1 size={22} />
          </S.IconBox>
        </S.FlexLine>
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

  & > button {
    border: none;
    background-color: #d8dfec;
    border-radius: 20px;
    width: 80%;
    margin: 80px auto 20px;
    padding: 10px;
    font-weight: bold;
    :hover {
      background-color: #bfd2f6;
    }
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 0 auto;
  font-size: 18px;
  width: 80%;
  border-bottom: 1px solid var(--color-blue);
`;

const FlexLine = styled.div`
  ${FlexCenterCSS}
  width: 100%;
`;

const IconBox = styled.div`
  ${HoverCSS}
  margin-right: 8px;
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
  FlexLine,
  IconBox,
  Input,
};
