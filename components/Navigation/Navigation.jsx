import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Menu, Row, Col,
} from 'antd';

import Logo from 'components/Icons/Logo';
import ProfileNavigation from './Profile';

const HeaderContainer = styled(Row)`
  background: #ffffff;
  height: 70px;
  margin: 0 40px;

  @media only screen and (max-width: 576px) {
    margin: 0 0 0 0px;
    height: 95px;
  }
`;

const NavigationMenu = styled(Menu)`
  border-bottom: none;
  width: 280px;
`;

const LogoContainer = styled(Col)`
  @media only screen and (max-width: 576px) {
    margin: 10px 20px;
  }
`;

const ProfileNavigationContainer = styled(Row)`
  @media only screen and (max-width: 576px) {
    margin-right: 20px;
  }
`;

const Navigation = ({ menu }) => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <HeaderContainer type="flex" align="middle" justify="space-around">
      <LogoContainer xs={{ span: 22 }} lg={6} md={6} sm={6} align="start">
        <Logo />
      </LogoContainer>
      <Col xs={24} md={18} lg={18}>
        <ProfileNavigationContainer type="flex" align="middle" justify="space-around">
          <Col span={12}>
            <NavigationMenu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              {
                menu.map(({ name, url }) => (
                  <Menu.Item key={name}>
                    <Link href={url}>
                      <span>{name}</span>
                    </Link>
                  </Menu.Item>
                ))
              }
            </NavigationMenu>
          </Col>
          <Col xs={12} sm={12} lg={12}>
            <ProfileNavigation />
          </Col>
        </ProfileNavigationContainer>
      </Col>
    </HeaderContainer>
  );
};

Navigation.propTypes = {
  menu: PropTypes.array,
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
