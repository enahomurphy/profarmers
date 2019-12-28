import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import color from 'globals/color';

const IconContainer = styled.div`
  width: 34px;
  height: 34px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-right: 20px;
  cursor: pointer;

  i {
    height: 20px;

    &:hover {
      opacity: .5;
    }
  }
`;

const RoundedIcon = ({
  height, style, width, type,
}) => (
  <IconContainer>
    <Icon
      style={{ fontSize: '20px', color: color.primaryColor, ...style }}
      type={type}
      height={height}
      width={width}
    />
  </IconContainer>
);

RoundedIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
};

RoundedIcon.defaultProps = {
  height: '20px',
  width: '20px',
  style: {},
};

export default RoundedIcon;
