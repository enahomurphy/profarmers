import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List, Spin, Typography, Row, Button,
} from 'antd';

import Link from 'components/Link';

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

const StyledRow = styled(Row)`
  margin-bottom: 30px;
  
  button {
    height: 50px;
  }
`;

const RecentTopics = ({
  loading, hasNext, handleInfiniteOnLoad, data, title, renderHeader, ListItem, getLink,
}) => (
  <InfiniteScrollList>
    {renderHeader && (
      renderHeader
    )}
    {
      title && (
        <StyledRow type="flex" justify="space-between" align="middle">
          <Typography.Title style={{ fontSize: '20px', margin: 0 }}>
            Recent Discussion
          </Typography.Title>
          <Button type="primary">
            Create New Forum
          </Button>
        </StyledRow>
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
          <Link href={getLink(item)}>
            <ListItem
              {...item}
              loading={loading}
              width="100px"
            />
          </Link>
        )}
      />
    </InfiniteScroll>
  </InfiniteScrollList>
);


export default RecentTopics;

RecentTopics.defaultProps = {
  title: 'Recent Discussion',
  renderHeader: null,
  getLink: () => '',
};

RecentTopics.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
  title: PropTypes.string,
  renderHeader: PropTypes.element,
  ListItem: PropTypes.element.isRequired,
  getLink: PropTypes.func,
};
