import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from 'antd';


const FormPageWrapper = styled.div`
  max-width: 600px;
  padding: 30px 50px 75px 50px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.05);
  width: 100%;

  @media only screen and (max-width: 576px) { 
    box-shadow: inherit;
  }
`;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 100%;

  @media only screen and (max-width: 576px) {
    margin-top: 50px;
    box-shadow: inherit;
  }
`;

const FormWrapper = ({ title, subTitle, children }) => (
  <SignupContainer>
    <Typography>
      <Typography.Title style={{ textAlign: 'center', fontSize: '24px' }}>
        {title}
      </Typography.Title>
      <Typography.Text>
        {subTitle}
      </Typography.Text>
    </Typography>
    <FormPageWrapper>
      {children}
    </FormPageWrapper>
  </SignupContainer>
);

FormWrapper.defaultProps = {
  subTitle: '',
};

FormWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default FormWrapper;
