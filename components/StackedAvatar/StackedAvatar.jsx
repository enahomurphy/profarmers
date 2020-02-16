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
    { adjust, avatarwidth, stagedpadding },
  ) => `${adjust * ((avatarwidth / 2) + stagedpadding)}px`};
  }

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};

    svg {
      width: ${props => `${props.avatarwidth / 2}px`};
      height: ${props => `${props.avatarwidth / 2}px`};
    }
  }
`;

const CountColumn = styled(Col)`
  display: flex;
  align-items: center;
`;

const StackedAvatar = ({
  avatars, avatarwidth, stagedpadding, count, width, showCount,
}) => (
  <Row
    style={{ height: `${avatarwidth}px`, maxWidth: width, width }
  }
    type="flex"
    justify="end"
  >
    <StackedAvatarContainer height={avatarwidth} span={showCount ? 16 : 24}>
      {
        avatars.map(({ src, alt }, index) => (
          <StackedAvatarImages
            key={`${alt + index}`}
            adjust={index}
            icon="user"
            src={src}
            alt={alt}
            avatarwidth={avatarwidth}
            width={`${avatarwidth}px`}
            height={`${avatarwidth}px`}
            stagedpadding={stagedpadding}
          />
        ))
      }
    </StackedAvatarContainer>
    {
      showCount && (
        <CountColumn
          style={{
            display: 'flex', justifyContent: 'flex-end', height: avatarwidth,
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

StackedAvatar.defaultProps = {
  count: 0,
};

StackedAvatar.propTypes = {
  avatars: PropTypes.array.isRequired,
  avatarwidth: PropTypes.number,
  stagedpadding: PropTypes.number,
  count: PropTypes.number,
  width: PropTypes.string,
  showCount: PropTypes.bool,
};

StackedAvatar.defaultProps = {
  avatarwidth: 30,
  stagedpadding: 5,
  width: '250px',
  showCount: true,
};

export default StackedAvatar;
