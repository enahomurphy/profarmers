import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import SignupForm from './SignupForm';

const FormWrapper = styled.div`
  max-width: 600px;
  padding: 30px 50px 75px 50px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.05);

  @media only screen and (max-width: 576px) { 
    box-shadow: inherit;
  }
`;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;

  @media only screen and (max-width: 576px) {
    margin-top: 50px;
    box-shadow: inherit;
  }
`;

const Signup = () => (
  <SignupContainer>
    <Typography>
      <Typography.Title style={{ textAlign: 'center', fontSize: '24px' }}>
          Create Your Account
      </Typography.Title>
    </Typography>
    <FormWrapper>
      <SignupForm />
    </FormWrapper>
  </SignupContainer>
);

export default Signup;
