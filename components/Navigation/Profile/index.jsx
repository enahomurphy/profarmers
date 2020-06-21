import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { MailOutlined, SettingOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

import AvatarDropDown from './AvatarDropDown';
import ProfileMenuWithIcons from './ProfileMenuWithIcons';

const ProfileNavigation = ({ menu }) => (
  <Fragment>
    <Row type="flex" justify="end">
      <Col justify="end" md={0}>
        <AvatarDropDown menu={menu} />
      </Col>
      <Col xs={0} md={24}>
        <ProfileMenuWithIcons menu={menu} />
      </Col>
    </Row>
  </Fragment>
);


ProfileNavigation.propTypes = {
  menu: PropTypes.array,
};

ProfileNavigation.defaultProps = {
  menu: [
    {
      name: 'search',
      url: '/feed?search=true',
      icon: SearchOutlined,
    },
    {
      name: 'profile',
      url: '/profile',
      icon: UserOutlined,
    },
    {
      name: 'messages',
      url: '/messages',
      icon: MailOutlined,
    },
    {
      name: 'settings',
      url: '/settings',
      icon: SettingOutlined,
    },
  ],
};

export default ProfileNavigation;
