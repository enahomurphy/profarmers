import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';
import {
  Form, Input, Button, Typography,
} from 'antd';
import router from 'next/router';

import authGGL from 'lib/graphql/auth';
import WithLabel from 'components/Form/WithLabels';
import getErrors from 'lib/errors';
import get from 'lib/utils/get';
import useLoginUser from '../hooks/useLogin';

import Social from '../Social';

const SignupForm = () => {
  const [signup] = useMutation(authGGL.query.SIGNUP);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit, control, errors, setError,
  } = useForm();
  const loginUser = useLoginUser();

  useEffect(() => {
    router.prefetch('/signup/complete');
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await signup({ variables: values });
      loginUser(data.signup);
    } catch (error) {
      const { message, formErrors } = getErrors(error, 'signup');

      if (message) {
        setErrorMessage(message);
      }

      if (formErrors.length) {
        setError(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <Typography.Text style={{ textAlign: 'center', display: 'block' }} type="danger">
        {errorMessage}
      </Typography.Text>
      <WithLabel errors={get(errors, 'email.message', '')} label="email / phone number">
        <Controller
          as={<Input />}
          name="email"
          type="email"
          control={control}
          rules={{
            required: 'Please Enter a valid email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          }}
        />
      </WithLabel>
      <WithLabel errors={get(errors, 'password.message', '')} label="password">
        <Controller
          as={<Input />}
          name="password"
          type="password"
          control={control}
          rules={{
            required: 'Please Enter a valid password',
          }}
        />
      </WithLabel>
      <Typography.Paragraph style={{ textAlign: 'center' }}>
        <Typography.Text>
          By registering , you agree to the Profamers User Agreement,
          Privacy Policy, and Cookie Policy.
        </Typography.Text>
      </Typography.Paragraph>
      <Button
        style={{ width: '100%', height: '50px' }}
        type="primary"
        htmlType="submit"
        className="login-form-button"
        loading={loading}
      >
        Register
      </Button>
      <Social
        type="signup"
        dividerText="Or connect with"
        onSuccess={loginUser}
        onFailure={message => setErrorMessage(message)}
      />
    </Form>
  );
};

export default SignupForm;
