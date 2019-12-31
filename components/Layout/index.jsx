import React from 'react';
import PropTypes from 'prop-types';

import Navigation from 'components/Navigation';
import Meta from './meta';

const Layout = ({ children, title, page }) => (
  <div>
    <Meta title={title} />
    <Navigation page={page} />
    {children}
  </div>
);


Layout.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Layout;
