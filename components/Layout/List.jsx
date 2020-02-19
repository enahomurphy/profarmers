import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List, Spin, Typography, Row,
} from 'antd';

const InfiniteScrollList = styled.section`
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
  loading, hasNext, handleInfiniteOnLoad, data, title, renderHeader, ListItem,
}) => (
  <InfiniteScrollList>
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
      dataLength={data.length}
      isReverse
      next={handleInfiniteOnLoad}
      refreshFunction={handleInfiniteOnLoad}
      hasMore={hasNext}
      useWindow
      pullDownToRefresh
      loader={(
        <Row type="flex" justify="center">
          <Spin />
        </Row>
      )}
    >
      <List
        dataSource={data}
        renderItem={item => (
          <ListItem
            {...item}
            loading={loading}
            width="100px"
          />
        )}
      />
    </InfiniteScroll>
  </InfiniteScrollList>
);


export default RecentTopics;

RecentTopics.defaultProps = {
  title: 'Recent Discussion',
  renderHeader: null,
};

RecentTopics.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
  title: PropTypes.string,
  renderHeader: PropTypes.element,
  ListItem: PropTypes.element.isRequired,
};
