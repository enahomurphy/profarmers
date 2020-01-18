
import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';
import {
  Skeleton, Card, Avatar, Typography,
} from 'antd';

import color from 'globals/color';
import formatNumber from 'lib/utils/formatNumber';

const CardMeta = styled(Card.Meta)`
  display: flex;
  align-items: center;

  .ant-card-meta-title {
    font-size: 12px;
  }

  .ant-card-meta-avatar {
    height: 100%;
  }

  .ant-avatar-image {
    height: 40px
    width: 40px;
  }

  @media only screen and (max-width: 576px) {
    .ant-avatar-image {
      height: 30px;
      width: 30px;
    }

    .ant-card-meta-title {
      margin: 0px;
    }
  }
`;

const TopicCard = ({
  loading, user, replies, details, title,
}) => (
  <Skeleton loading={loading} avatar active>
    <Card
      headStyle={{ background: color.primaryColor, color: 'white' }}
      hoverable
      title={title}
    >
      <Typography.Paragraph type="secondary" style={{ marginBottom: '30px' }} ellipsis={{ rows: 2 }}>
        {details}
      </Typography.Paragraph>
      <CardMeta
        avatar={
          <Avatar src={user.image} />
        }
        title={user.name}
        description={`${formatNumber(replies.totalCount)} replies`}
      />
    </Card>
  </Skeleton>
);


TopicCard.propTypes = {
  loading: PropType.bool.isRequired,
  replies: PropType.object.isRequired,
  user: PropType.object.isRequired,
  details: PropType.string.isRequired,
  title: PropType.string.isRequired,
};

export default TopicCard;
