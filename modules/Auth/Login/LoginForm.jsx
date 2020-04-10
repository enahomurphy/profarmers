import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';

import {
  Form, Input, Button, Typography,
} from 'antd';

import authGGL from 'lib/graphql/auth';
import WithLabel from 'components/Form/WithLabels';
import getErrors from 'lib/errors';
import get from 'lib/utils/get';
import useLoginUser from '../hooks/useLogin';
import Social from '../Social';

const SignupForm = () => {
  const [login] = useMutation(authGGL.query.LOGIN);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit, control, errors, setError,
  } = useForm();
  const loginUser = useLoginUser();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await login({ variables: values });
      loginUser(data.login, null, 'login');
    } catch (error) {
      const { message, formErrors } = getErrors(error, 'login');

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
      <Button
        style={{ width: '100%', height: '50px' }}
        type="primary"
        htmlType="submit"
        className="login-form-button"
        loading={loading}
      >
        Login
      </Button>
      <Social
        type="login"
        dividerText="Or connect with"
        onSuccess={loginUser}
        onFailure={message => setErrorMessage(message)}
      />
    </Form>
  );
};

export default SignupForm;
