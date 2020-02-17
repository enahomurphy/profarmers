import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import {
  List, Spin, Typography,
} from 'antd';

import TopicList from 'components/List/PreviewList';

const RecentTopicsSection = styled.section`
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
  loading, hasMore, handleInfiniteOnLoad, topics, title, renderHeader,
}) => (
  <RecentTopicsSection>
    {renderHeader && (
      renderHeader
    )}
    {
      title && (
        <Typography.Title style={{ fontSize: '20px', marginBottom: '30px' }}>
          {title}
        </Typography.Title>
      )
    }
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={handleInfiniteOnLoad}
      hasMore={loading && hasMore}
      useWindow={false}
    >
      <List
        dataSource={topics}
        renderItem={item => (
          <TopicList
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
  </RecentTopicsSection>
);

export default RecentTopics;

RecentTopics.defaultProps = {
  title: 'Recent Discussion',
  renderHeader: null,
};

RecentTopics.propTypes = {
  topics: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
  title: PropTypes.string,
  renderHeader: PropTypes.element,
};
