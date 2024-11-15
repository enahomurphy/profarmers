import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {
  List, Skeleton, Avatar, Typography, Row,
} from 'antd';

import StackedAvatar from 'components/StackedAvatar';
import Divider from 'components/Icons/Divider';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

const UserInfo = styled(Typography)`
  span {
    font-size: 12px;
  }
`;

const AvatarWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 5px;
`;

const ListMeta = styled(List.Item.Meta)`
  height: 50px;
  position: relative;
  max-width: 900px;
  cursor: pointer;
  padding: 0px 20px;
  
  &:hover {
    box-shadow: 0px 8px 15px rgba(0,0,0,0.05);
    transition: .2s;
  }

  &.ant-list-item-meta {
    align-items: center;
  }
`;

const getRepliesAvatar = users => users.map(user => ({
  src: user.profileImage,
  alt: user.fullName,
}));

const getTitle = (title, truncateDetails) => (
  (truncateDetails && title.length > 20) ? title.slice(0, 20).concat('...') : title
);

const PreviewList = ({
  loading, user, title, users, lastUpdatedAt, replyCount, truncateDetails,
}) => (
  <Skeleton avatar title={false} loading={loading} active>
    <ListMeta
      avatar={
        <Avatar src={user.profileImage} />
      }
      title={getTitle(title, truncateDetails)}
      description={(
        <Row type="flex" align="middle" justify="space-between">
          <UserInfo style={{ display: 'flex', alignItems: 'center' }}>
            {
              !truncateDetails
              && (
                <>
                  <Typography.Text type="secondary">
                    {user.fullName}
                  </Typography.Text>
                  <Divider />
                  <Typography.Text type="secondary">
                    {timeAgo.format(new Date(lastUpdatedAt))}
                  </Typography.Text>
                </>
              )
            }
            <AvatarWrapper>
              <StackedAvatar
                avatars={getRepliesAvatar(users)}
                count={replyCount}
                avatarwidth={40}
                width="150px"
              />
            </AvatarWrapper>
          </UserInfo>
        </Row>
      )}
    />
  </Skeleton>
);

PreviewList.defaultProps = {
  truncateDetails: false,
};

PreviewList.propTypes = {
  user: PropTypes.object.isRequired,
  lastUpdatedAt: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  replyCount: PropTypes.number.isRequired,
  truncateDetails: PropTypes.bool,
};

export default PreviewList;
