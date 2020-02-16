import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  List, Skeleton, Typography, Row, Col,
} from 'antd';
import StackedAvatar from 'components/StackedAvatar';

import getAvatars from './helper/getAvatars';

const StyledList = styled(List.Item)`
  cursor: pointer;

  &.ant-list-item {
    padding: 10px;
    border: none;
  }

  &:hover {
    box-shadow: 0px 8px 15px rgba(0,0,0,0.05);
    transition: .2s;
  }
`;

const ForumList = ({
  loading, users, title, topicCount,
}) => (
  <StyledList>
    <Skeleton avatar title={false} loading={loading} active>
      <Row>
        <Col>
          <Typography.Title style={{ fontSize: '16px' }}>
            {title}
          </Typography.Title>
        </Col>
        <Col style={{ display: 'flex' }}>
          <Typography.Text style={{ marginRight: '10px' }}>
            {topicCount}
            {' '}
            Topics
          </Typography.Text>
          <StackedAvatar
            avatars={getAvatars(users)}
            avatarwidth={23}
            width="150px"
            showCount={false}
          />
        </Col>
      </Row>
    </Skeleton>
  </StyledList>
);


ForumList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  topicCount: PropTypes.number.isRequired,
};


export default ForumList;
