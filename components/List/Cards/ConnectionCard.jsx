import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';
import {
  Skeleton, Card, Avatar, Typography, Button,
} from 'antd';

import color from 'globals/color';

const Eclipse = styled.div`
  width: 3px;
  height: 3px;
  left: 57px;
  top: 132px;
  background: ${color.lightGray};
  border: none;
  border-radius: 100%;
  display: inline-block;
  margin-right: 3px;
`;

const CardMeta = styled(Card.Meta)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .ant-card-meta-detail > div:not(:last-child) {
    margin: 15px 0 0 0;
  }

  .ant-card-meta-title {
    font-size: 14px;
    white-space: initial;
  }

  .ant-avatar-image {
    height: 50px
    width: 50px;
  }

  .ant-card-meta-avatar {
    padding: 0px;
  }
`;

const ConnectedCard = ({
  loading, user,
}) => (
  <Skeleton loading={loading} avatar active>
    <Card hoverable style={{ width: '160px' }}>
      <CardMeta
        avatar={
          <Avatar src={user.profileImage} />
        }
        title={user.fullName}
        description={(
          <div>
            <Typography.Text
              style={{
                textTransform: 'capitalize',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color.lightGray}`,
                marginBottom: '10px',
              }}
              type="secondary"
            >
              <Eclipse />
              {user.personal}
            </Typography.Text>
            <Button
              style={{ width: '120px', height: '34px', borderRadius: 0 }}
              type="primary"
            >
              connect
            </Button>
          </div>
        )}
      />
    </Card>
  </Skeleton>
);


ConnectedCard.propTypes = {
  loading: PropType.bool.isRequired,
  user: PropType.object.isRequired,
};

export default ConnectedCard;
