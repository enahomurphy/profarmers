import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import Authenticated from './Authenticated';
import UnAuthNav from './UnAuthNav';

const getNav = (page) => {
  switch (page) {
    case 'login':
      return () => <UnAuthNav state="sign up" link="/signup" />;
    case 'signup':
      return () => <UnAuthNav state="sign in" link="/login" />;
    default:
      return Authenticated;
  }
};

const RightNav = ({ menu, page }) => {
  const NavMenu = getNav(page);
  return (
    <Col xs={24} md={18} lg={18}>
      <NavMenu menu={menu} />
    </Col>
  );
};

RightNav.defaultProps = {
  page: '',
};

RightNav.propTypes = {
  page: PropTypes.string,
  menu: PropTypes.array.isRequired,
};

export default RightNav;
