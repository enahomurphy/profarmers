import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Menu, Row, Col,
} from 'antd';

import ProfileNavigation from './Profile';

const ProfileNavigationContainer = styled(Row)`
  @media only screen and (max-width: 576px) {
    margin-right: 20px;
  }
`;

const NavigationMenu = styled(Menu)`
  border-bottom: none;
  width: 280px;
`;

const Authenticated = ({ menu }) => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <ProfileNavigationContainer type="flex" align="middle" justify="space-around">
      <Col span={12}>
        <NavigationMenu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {
          menu.map(({ name, url }) => (
            <Menu.Item key={name}>
              <Link href={url}>
                <a>{name}</a>
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
  );
};

Authenticated.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default Authenticated;
