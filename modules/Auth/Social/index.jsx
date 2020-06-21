import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import {
  Button, Row, Col, Divider, Typography,
} from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

import authGGL from 'lib/graphql/auth';

const SocialButtons = styled(Button)`
  width: 100%;
  max-width: 120px;
  height: 50px;
  margin-left: 20px;

  &:hover {
    border-color: ${props => props.hovercolor};
    transition: .6s;
  }
`;


const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;

  & button:first-child {
    margin-left: 0px;
  }
`;

const SocialAuth = ({
  onSuccess, onFailed, dividerText, ...props
}) => {
  const [signup] = useMutation(authGGL.query.SOCIAL_SIGNUP);

  const onFailure = (app) => {
    onFailed(`unable to ${props.type} with ${app}.`);
  };

  const createAccount = async (payload, type) => {
    try {
      const { data } = await signup({
        variables: {
          accessToken: payload.accessToken,
          type,
        },
      });
      onSuccess(data.socialSignup, payload, type);
    } catch (error) {
      onFailure(type);
    }
  };

  const handleLogin = async (data, type) => {
    await createAccount(data, type);
  };

  return (
    <Row justify="space-around" style={{ marginTop: 5 }}>
      <Col>
        <Divider>
          <Typography.Paragraph style={{ margin: '0px' }}>
            {dividerText}
          </Typography.Paragraph>
        </Divider>
      </Col>
      <StyledCol>
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          fields="first_name,last_name,gender,email,picture"
          onFailure={() => onFailure('facebook')}
          callback={data => handleLogin(data, 'facebook')}
          render={renderProps => (
            <SocialButtons hovercolor="#3b5998" disabled={renderProps.disabled} onClick={renderProps.onClick}>
              <FacebookOutlined style={{ color: 'blue', fontSize: 25 }} type="facebook" theme="filled" />
            </SocialButtons>
          )}
        />
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={data => handleLogin(data, 'google')}
          onFailure={() => onFailure('google')}
          cookiePolicy="single_host_origin"
          render={renderProps => (
            <SocialButtons hovercolor="#de5246" disabled={renderProps.disabled} onClick={renderProps.onClick}>
              <GoogleOutlined style={{ color: 'red', fontSize: 25 }} type="google-circle" theme="filled" />
            </SocialButtons>
          )}
        />
      </StyledCol>
    </Row>
  );
};

SocialAuth.defaultProps = {
  onSuccess: () => {},
  onFailed: () => {},
};

SocialAuth.propTypes = {
  onSuccess: PropTypes.func,
  onFailed: PropTypes.func,
  type: PropTypes.string.isRequired,
  dividerText: PropTypes.string.isRequired,
};

export default SocialAuth;
