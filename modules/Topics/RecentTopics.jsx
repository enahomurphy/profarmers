import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List, Spin, Typography, Row,
} from 'antd';

import TopicList from 'components/List/PreviewList';

const RecentTopicsSection = styled.section`
  padding: ${props => `${props.paddingTopBottom}px`} 0;
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
  loading, hasMore, handleInfiniteOnLoad, topics, title, renderHeader, paddingTopBottom, endMessage, truncateDetails,
}) => (
  <RecentTopicsSection paddingTopBottom={paddingTopBottom}>
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
      dataLength={topics ? topics.length : 0}
      isReverse
      next={handleInfiniteOnLoad}
      refreshFunction={handleInfiniteOnLoad}
      hasMore={hasMore}
      useWindow
      pullDownToRefresh
      endMessage={endMessage}
      loader={(
        <Row type="flex" justify="center">
          <Spin />
        </Row>
      )}
    >
      <List
        dataSource={topics}
        renderItem={item => (
          <TopicList
            {...item}
            loading={loading}
            truncateDetails={truncateDetails}
            width="100px"
          />
        )}
      >
        {loading && (
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
  paddingTopBottom: 30,
  endMessage: (
    <Typography.Paragraph>
      <b>Yay! You have seen it all</b>
    </Typography.Paragraph>
  ),
  truncateDetails: false,
};

RecentTopics.propTypes = {
  topics: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
  title: PropTypes.string,
  renderHeader: PropTypes.element,
  paddingTopBottom: PropTypes.number,
  endMessage: PropTypes.object,
  truncateDetails: PropTypes.bool,
};
