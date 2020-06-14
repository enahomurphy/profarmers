import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import Logo from 'components/Icons/Logo';
import RightNav from './RightNav';

const HeaderContainer = styled(Row)`
  background: #ffffff;
  height: 70px;
  margin: 0 4px;
  width: 100%;

  @media only screen and (max-width: 576px) {
    margin: 0 0 0 0px;
    height: 95px;
  }
`;

const LogoContainer = styled(Col)`
  @media only screen and (max-width: 576px) {
    margin: 10px 20px;
  }
`;

const Navigation = ({ menu, page }) => (
  <HeaderContainer type="flex" align="middle" justify="space-around">
    <LogoContainer xs={{ span: 22 }} lg={6} md={6} sm={6} align="start">
      <Logo />
    </LogoContainer>
    <RightNav menu={menu} page={page} />
  </HeaderContainer>
);

Navigation.propTypes = {
  menu: PropTypes.array,
  page: PropTypes.string.isRequired,
};

Navigation.defaultProps = {
  menu: [
    {
      name: 'feed',
      url: '/feed',
    },
    {
      name: 'community',
      url: '/community',
    },
    {
      name: 'forum',
      url: '/forum',
    },
  ],
};

export default Navigation;
