import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  List, Skeleton, Avatar, Typography, Row, Col,
} from 'antd';

import StackedAvatar from 'components/StackedAvatar';
import Divider from 'components/Icons/Divider';

const UserInfo = styled(Typography)`
  span {

    font-size: 12px;
  }
`;

const getRepliesAvatar = replies => replies.map(({ user }) => ({
  src: user.image,
  alt: user.name,
}));

const PreviewList = ({
  loading, user, title, replies,
}) => (
  <Skeleton avatar title={false} loading={loading} active>
    <List.Item.Meta
      avatar={
        <Avatar src={user.image} />
      }
      title={title}
      description={(
        <Row type="flex" align="middle" justify="space-between">
          <Col lg={18}>
            <UserInfo style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text type="secondary">
                {user.name}
              </Typography.Text>
              <Divider />
              <Typography.Text type="secondary">
                {user.lastSeen}
              </Typography.Text>
            </UserInfo>
          </Col>
          <Col lg={6}>
            <Row type="flex" align="middle">
              <StackedAvatar
                avatars={getRepliesAvatar(replies.lastReplies)}
                count={replies.totalCount}
                avatarWidth={24}
                width="100px"
              />
            </Row>
          </Col>
        </Row>
      )}
    />
  </Skeleton>
);


PreviewList.propTypes = {
  user: PropTypes.object.isRequired,
  replies: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default PreviewList;
