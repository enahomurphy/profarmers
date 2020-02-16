import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Avatar, Row, Col, Typography,
} from 'antd';

import formatNumber from 'lib/utils/formatNumber';

const StackedAvatarContainer = styled(Col)`
  position: relative;
  width: 100%;
  display: flex;
  min-height: ${props => props.height};
`;

const StackedAvatarImages = styled(Avatar)`
  &.ant-avatar  {
    width: ${props => props.width};
    height: ${props => props.height};
    position: absolute;
    z-index: ${props => props.adjust};
    left: ${(
    { adjust, avatarWidth, stagedPadding },
  ) => `${adjust * ((avatarWidth / 2) + stagedPadding)}px`};
  }

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};

    svg {
      width: ${props => `${props.avatarWidth / 2}px`};
      height: ${props => `${props.avatarWidth / 2}px`};
    }
  }
`;

const CountColumn = styled(Col)`
  display: flex;
  align-items: center;
`;

const StackedAvatar = ({
  avatars, avatarWidth, stagedPadding, count, width, showCount,
}) => (
  <Row
    style={{ height: `${avatarWidth}px`, maxWidth: width, width }
  }
    type="flex"
    justify="end"
  >
    <StackedAvatarContainer height={avatarWidth} span={showCount ? 16 : 24}>
      {
        avatars.map(({ src, alt }, index) => (
          <StackedAvatarImages
            adjust={index}
            icon="user"
            src={src}
            alt={alt}
            avatarWidth={avatarWidth}
            width={`${avatarWidth}px`}
            height={`${avatarWidth}px`}
            stagedPadding={stagedPadding}
          />
        ))
      }
    </StackedAvatarContainer>
    {
      showCount && (
        <CountColumn
          style={{
            display: 'flex', justifyContent: 'flex-end', height: avatarWidth,
          }}
          span={8}
        >
          <Typography>
            <Typography.Text
              strong
              type="secondary"
            >
              {`+${formatNumber(count)}`}
            </Typography.Text>
          </Typography>
        </CountColumn>
      )
    }
  </Row>
);

StackedAvatar.propTypes = {
  avatars: PropTypes.array.isRequired,
  avatarWidth: PropTypes.number,
  stagedPadding: PropTypes.number,
  count: PropTypes.number.isRequired,
  width: PropTypes.string,
  showCount: PropTypes.bool,
};

StackedAvatar.defaultProps = {
  avatarWidth: 30,
  stagedPadding: 5,
  width: '250px',
  showCount: true,
};

export default StackedAvatar;
