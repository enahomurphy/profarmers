import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  List, Spin, Typography, Row, Button,
} from 'antd';

import ForumList from 'components/List/ForumList';

const ForumSection = styled.section`
  padding: 30px 0;
  height: 240px;
  max-width: 900px;
  margin: 0px auto;

  ul > .ant-list-item {
    margin-bottom: 20px;
  }
`;

const StyledRow = styled(Row)`
  margin-bottom: 30px;
  
  button {
    height: 50px;
  }
`;

const Forums = ({
  loading, hasMore, handleInfiniteOnLoad, forums,
}) => (
  <ForumSection>
    <StyledRow type="flex" justify="space-between" align="middle">
      <Typography.Title style={{ fontSize: '20px', margin: 0 }}>
        Recent Discussion
      </Typography.Title>
      <Button type="primary">
        Create New Forum
      </Button>
    </StyledRow>
    <InfiniteScroll
      dataLength={forums.length}
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
        dataSource={forums}
        renderItem={item => (
          <ForumList
            key={item.id}
            {...item}
            loading={loading}
            width="100px"
          />
        )}
      />
    </InfiniteScroll>
  </ForumSection>
);

export default Forums;

Forums.propTypes = {
  forums: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
};
