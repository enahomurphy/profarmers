import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Avatar, Badge, Icon, Menu,
} from 'antd';
import Dropdown from 'antd/lib/dropdown';

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileMenu = ({ menu }) => (
  <Menu>
    {
      menu.map(({ name, url }) => (
        <Menu.Item key={name}>
          <Link href={url}>
            <span>{name}</span>
          </Link>
        </Menu.Item>
      ))
    }
  </Menu>
);

ProfileMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};


const AvatarDropDown = ({ menu }) => (
  <Dropdown overlay={<ProfileMenu menu={menu} />}>
    <AvatarContainer>
      <Badge count={1}>
        <Avatar size={30} shape="circle" icon="user" />
      </Badge>
      <Icon style={{ fontSize: '20px', marginLeft: '5px' }} type="down" />
    </AvatarContainer>
  </Dropdown>
);

AvatarDropDown.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default AvatarDropDown;
