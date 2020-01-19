
import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';
import {
  Skeleton, Card, Avatar, Typography,
} from 'antd';

import color from 'globals/color';
import formatNumber from 'lib/utils/formatNumber';

const TopicCardWrapper = styled(Card)`
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.05);
  border: 0px;

  .ant-card-body {
    max-height: 220px;
  }
`;

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
  loading, user, replyCount, details, title,
}) => (
  <Skeleton loading={loading} avatar active>
    <TopicCardWrapper
      headStyle={{ background: color.primaryColor, color: 'white' }}
      hoverable
      title={title}
    >
      <Typography.Paragraph type="secondary" style={{ marginBottom: '30px' }} ellipsis={{ rows: 2 }}>
        {details}
      </Typography.Paragraph>
      <CardMeta
        avatar={
          <Avatar src={user.profileImage} />
        }
        title={user.fullName}
        description={`${formatNumber(replyCount)} replies`}
      />
    </TopicCardWrapper>
  </Skeleton>
);


TopicCard.propTypes = {
  loading: PropType.bool.isRequired,
  replyCount: PropType.number.isRequired,
  user: PropType.object.isRequired,
  details: PropType.string.isRequired,
  title: PropType.string.isRequired,
};

export default TopicCard;
