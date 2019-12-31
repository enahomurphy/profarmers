import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Typography,
} from 'antd';

import WithLabel from 'components/Form/WithLabels';

const SignupForm = ({ form }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.info('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <WithLabel label="email / phone number">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input />,
        )}
      </WithLabel>
      <WithLabel label="password">
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            type="password"
          />,
        )}
      </WithLabel>
      <Typography.Paragraph style={{ textAlign: 'center' }}>
        <Typography.Text>
          By clicking Agree & Join, you agree to the LinkedIn User Agreement,
          Privacy Policy, and Cookie Policy.
        </Typography.Text>
      </Typography.Paragraph>
      <Button
        style={{ width: '100%', height: '50px' }}
        type="primary"
        htmlType="submit"
        className="login-form-button"
      >
        Register
      </Button>
    </Form>
  );
};

SignupForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'normal_login' })(SignupForm);
