import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  Form, Input, Button, Typography,
} from 'antd';

import authGGL from 'lib/graphql/auth';
import WithLabel from 'components/Form/WithLabels';
import getErrorByPath from 'lib/errors/getErrorByPath';
import getFormErrors from 'lib/errors/getFormErrors';
import get from 'lib/utils/get';

const SignupForm = () => {
  const [signup] = useMutation(authGGL.query.LOGIN);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit, control, errors, setError,
  } = useForm();
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await signup({ variables: values });
      localStorage.setItem('jwt', data.login.token);
      router.push('/');
    } catch (error) {
      const loginError = getErrorByPath(error.graphQLErrors, 'login');
      if (loginError.message) {
        setErrorMessage(loginError.message);
      }

      const formErrors = getFormErrors(error.graphQLErrors, 'login');
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
      <Button
        style={{ width: '100%', height: '50px' }}
        type="primary"
        htmlType="submit"
        className="login-form-button"
        loading={loading}
      >
        Login
      </Button>
    </Form>
  );
};

export default SignupForm;
