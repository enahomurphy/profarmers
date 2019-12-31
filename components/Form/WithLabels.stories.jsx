import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input,
} from 'antd';

import WithLabels from './WithLabels';

export default {
  title: 'Form With Labels',
};

const TestForm = ({ form }) => {
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
      <WithLabels label="username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input placeholder="Username" />,
        )}
      </WithLabels>
    </Form>
  );
};

TestForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const StoryForm = Form.create({ name: 'test_form' })(TestForm);
export const withLabels = () => (
  <div style={{ margin: '20px' }}>
    <StoryForm />
  </div>
);
