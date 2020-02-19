import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from 'antd';

import Navigation from 'components/Navigation';
import Meta from './meta';

const StyledBody = styled(Row)`
  max-width: 1200px;
  width: 100%;
  margin: 0px  auto;
`;

const Layout = ({ children, title, page }) => (
  <Row>
    <Meta title={title} />
    <Navigation page={page} />
    <StyledBody>
      {children}
    </StyledBody>
  </Row>
);


Layout.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Layout;
