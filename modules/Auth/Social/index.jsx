import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import {
  Icon, Button, Row, Col, Divider, Typography,
} from 'antd';

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

const SocialIcon = styled(Icon)`
  font-size: 25px;
  color: ${props => props.color};
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
      onSuccess(data.socialSignup, payload);
    } catch (error) {
      onFailure(type);
    }
  };

  const handleLogin = async (data, type) => {
    await createAccount(data, type);
  };

  return (
    <Row justify="space-around">
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
            <SocialButtons hovercolor="blue" disabled={renderProps.disabled} onClick={renderProps.onClick}>
              <SocialIcon color="blue" type="facebook" theme="filled" />
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
            <SocialButtons hovercolor="red" disabled={renderProps.disabled} onClick={renderProps.onClick}>
              <SocialIcon color="red" type="google-circle" theme="filled" />
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
