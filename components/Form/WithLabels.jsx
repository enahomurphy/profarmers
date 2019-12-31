import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'antd';

const InputWrapper = styled.div`

`;

const InputLabel = styled.label`
  font-size: 16px;
  display: inline-block;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const WithLabels = ({ label, children }) => (
  <InputWrapper>
    <InputLabel>
      {label}
    </InputLabel>
    <Form.Item>
      {children}
    </Form.Item>

  </InputWrapper>
);

WithLabels.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default WithLabels;
