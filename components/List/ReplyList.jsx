import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  List, Skeleton, Avatar, Typography, Row, Col,
} from 'antd';

import { Replies, Reply } from 'components/Icons';

const UserInfo = styled(Typography)`
  &:first-child {
    margin-right: 10px;
  }

  svg {
    margin-right: 5px;
  }
`;

const ReplyList = ({
  loading, user, title, reply,
}) => (
  <List.Item>
    <Skeleton avatar title={false} loading={loading} active>
      <Row>
        <Col>
          <List.Item.Meta
            avatar={<Avatar src={user.image} />}
            title={title}
          />

        </Col>
        <Col md={{ span: 22, offset: 2 }}>
          <Row>
            <Col md={18}>
              <Typography>
                <Typography.Text type="secondary">
                  {reply}
                </Typography.Text>
              </Typography>
            </Col>
            <Col md={6}>
              <Row type="flex" align="middle" justify="end">
                <UserInfo>
                  <Reply />
                  <Typography.Text strong>
                    Reply
                  </Typography.Text>
                </UserInfo>
                <UserInfo>
                  <Replies />
                  <Typography.Text strong>
                    Replies
                  </Typography.Text>
                </UserInfo>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Skeleton>
  </List.Item>
);


ReplyList.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  reply: PropTypes.string.isRequired,
};


export default ReplyList;
