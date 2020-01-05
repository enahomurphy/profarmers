import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const UnAuthNav = ({ state, link }) => (
  <Typography style={{ textAlign: 'right', cursor: 'pointer' }}>
    <Link href={link}>
      <a>
        <Typography.Text type="secondary">
          {`Have an account? ${state}`}
        </Typography.Text>
      </a>
    </Link>
  </Typography>
);

UnAuthNav.propTypes = {
  state: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default UnAuthNav;
