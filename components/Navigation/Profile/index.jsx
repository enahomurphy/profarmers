import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

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
      name: 'profile',
      url: '/profile',
      icon: 'user',
    },
    {
      name: 'messages',
      url: '/messages',
      icon: 'mail',
    },
    {
      name: 'settings',
      url: '/forum',
      icon: 'setting',
    },
  ],
};

export default ProfileNavigation;
