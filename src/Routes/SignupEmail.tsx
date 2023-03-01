import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import CONSTANT_INFO from '../Constant/Constant';
import URL from '../Url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const SubTitle = styled.div<{ state?: string }>`
  font-weight: bold;
  margin-top: 15px;
  margin: ${({ state }) => state === 'center' && '40px auto 0 auto'};
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
`;

const DupliButton = styled.button`
  border: none;
  width: 26%;
  height: 100%;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #bcbcbc;
  font-size: 15px;
  &:focus {
    outline: 1px solid var(--color-blue);
  }
`;

const SignupButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 10px;
  background: var(--color-blue);
  color: #ffffff;
  font-weight: 600;
  line-height: 40px;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: var(--color-dark-blue);
  }
`;

const P = styled.p`
  color: #f00001;
  font-weight: 600;
  font-size: 13px;
  display: inline-block;
  margin-top: 4px;
`;

const S = { Container, Title, SubTitle, Form, FlexRow, DupliButton, Input };

interface Inputs {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}
