import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import RoundedIcon from 'components/Icons/RoundedIcon';
import Link from 'components/Link';

const ProfileMenuWithIcons = ({ menu }) => (
  <Row type="flex" justify="end">
    {
      menu.map(({ name, url, icon }) => (
        <Link href={url} key={name}>
          <RoundedIcon type={icon} />
        </Link>
      ))
    }
  </Row>
);

ProfileMenuWithIcons.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default ProfileMenuWithIcons;
