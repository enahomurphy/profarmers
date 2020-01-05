import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Typography } from 'antd';

const InputWrapper = styled.div`
  .ant-error {
    display: block;
    line-height: 24px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  display: inline-block;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const WithLabels = ({ label, children, errors }) => (
  <InputWrapper>
    <InputLabel>
      {label}
    </InputLabel>
    <Form.Item>
      {children}
      {
        Array.isArray(errors) ? errors.map(error => (
          <Typography.Text className="ant-error" type="danger">
            {error}
          </Typography.Text>
        )) : (
          <Typography.Text className="ant-error" type="danger">
            {errors}
          </Typography.Text>
        )
      }
    </Form.Item>
  </InputWrapper>
);

WithLabels.defaultProps = {
  errors: '',
};

WithLabels.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default WithLabels;
