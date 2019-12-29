import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';
import {
  Skeleton, Card, Avatar, Typography,
} from 'antd';

import formatNumber from 'lib/utils/formatNumber';

const CardContainer = styled(Card)`
    height: 85px;
    display: flex;
    align-items: center;
    .ant-card-body {
      padding: 0;

      margin-left: 10px;
    }
`;

const CardMeta = styled(Card.Meta)`
  display: flex;
  align-items: center;

  .ant-card-meta-detail {
    margin-left: 10px;
  }

  .ant-card-meta-detail > div:not(:last-child) {
    margin: 0px;
  }

  .ant-card-meta-avatar {
    padding:  0px
  }

  .ant-card-meta-title {
    font-size: 16px;
    margin-bottom: 0;
  }

  .ant-avatar-image {
    height: 50px
    width: 50px;
  }
`;

const ConnectedCard = ({
  loading, user, replies,
}) => (
  <Skeleton loading={loading} avatar active>
    <CardContainer hoverable>
      <CardMeta
        avatar={
          <Avatar src={user.image} />
        }
        title={user.name}
        description={(
          <div>
            <Typography.Text
              style={{
                textTransform: 'capitalize',
                display: 'block',
                fontSize: '12px',
              }}
              type="secondary"
            >
              {user.personal}
            </Typography.Text>
            <Typography.Text strong type="secondary">
              { `+${formatNumber(replies.totalCount)} Connects`}
            </Typography.Text>
          </div>
        )}
      />
    </CardContainer>
  </Skeleton>
);


ConnectedCard.propTypes = {
  loading: PropType.bool.isRequired,
  replies: PropType.object.isRequired,
  user: PropType.object.isRequired,
};

export default ConnectedCard;
