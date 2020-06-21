import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Avatar,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledWrapper = styled(Row)`
  flex-direction: column;
  padding: 40px;
  border-bottom: 1px solid #EFEFEF;
`;

const StyledRow = styled(Row)`
  flex-direction: column;

  article {
    text-align: center;
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 20px;
      display: inline-block;
    }
  }

  .ant-avatar {
    width: 100px;
    height: 100px;
  }
`;

const TopicHeader = ({ user, topic }) => (
  <StyledWrapper>
    <Col>
      <ArrowLeftOutlined />
    </Col>
    <StyledRow type="flex" align="middle">
      <Typography>
        <Typography.Title>
          {topic.title}
        </Typography.Title>
        <Typography.Text>
          {topic.forum.title}
        </Typography.Text>
      </Typography>
      <Avatar size="large" src={user.profileImage} />
      <Row>
        <Typography.Paragraph strong style={{ margin: '20px auto' }}>
          {user.fullName}
        </Typography.Paragraph>
      </Row>
    </StyledRow>
    <Col>
      {topic.body}
    </Col>
  </StyledWrapper>
);

TopicHeader.propTypes = {
  user: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};

export default TopicHeader;
