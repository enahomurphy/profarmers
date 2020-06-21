import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Avatar, Badge, Menu,
} from 'antd';
import Dropdown from 'antd/lib/dropdown';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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
        <Avatar size={30} shape="circle" icon={<UserOutlined />} />
      </Badge>
      <DownOutlined style={{ fontSize: '20px', marginLeft: '5px' }} />
    </AvatarContainer>
  </Dropdown>
);

AvatarDropDown.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default AvatarDropDown;
