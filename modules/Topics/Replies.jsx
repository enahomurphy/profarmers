import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List, Spin, Typography, Row,
} from 'antd';

import ReplyList from 'components/List/ReplyList';

const RepliesSection = styled.section`
  padding: 30px 0;
  height: 240px;
  max-width: 900px;
  margin: 0px auto;

  ul > div {
    margin-bottom: 25px;
  }

  button {
    height: 50px;
    width: 200px;
    margin-right: 20px;
  }
`;

const RecentTopics = ({
  loading, hasMore, handleInfiniteOnLoad, replies, title,
}) => (
  <RepliesSection>
    {
      title && (
        <Typography.Title style={{ fontSize: '20px', marginBottom: '30px' }}>
          {title}
        </Typography.Title>
      )
    }
    <InfiniteScroll
      dataLength={replies.length}
      isReverse
      next={handleInfiniteOnLoad}
      refreshFunction={handleInfiniteOnLoad}
      hasMore={hasMore}
      useWindow
      pullDownToRefresh
      endMessage={(
        <Typography.Paragraph>
          <b>Yay! You have seen it all</b>
        </Typography.Paragraph>
      )}
      loader={(
        <Row type="flex" justify="center">
          <Spin />
        </Row>
      )}
    >
      <List
        dataSource={replies}
        renderItem={item => (
          <ReplyList
            {...item}
            loading={loading}
            width="100px"
          />
        )}
      >
        {loading && hasMore && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </List>
    </InfiniteScroll>
  </RepliesSection>
);


export default RecentTopics;

RecentTopics.defaultProps = {
  title: 'Recent Discussion',
  renderHeader: null,
};

RecentTopics.propTypes = {
  replies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
  title: PropTypes.string,
  renderHeader: PropTypes.element,
};
