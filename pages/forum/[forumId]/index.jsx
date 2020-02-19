import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Typography, Row, Button } from 'antd';
import styled from 'styled-components';

import withApollo from 'lib/apollo';
import { query as forumQuery } from 'lib/graphql/forum';
import Layout from 'components/Layout';
import List from 'components/Layout/List';
import TopicList from 'components/List/PreviewList';

const StyledHeader = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 30px;
  }
`;

const Topics = () => {
  const { query } = useRouter();
  const forumId = parseInt(query.forumId, 10);
  const { data: { forum, topics }, loading, hasNext } = forumQuery.useGetForum(forumId);

  return (
    <Layout page="feed" title={`Forum - ${forum.title || ''}`}>
      <List
        title=""
        data={topics}
        hasNext={hasNext}
        loading={loading}
        handleInfiniteOnLoad={() => {}}
        ListItem={TopicList}
        getLink={item => `/forum/${forum.id}/topics/${item.id}`}
        renderHeader={(
          <Fragment>
            <StyledHeader>
              <Typography.Title>
                {forum.title}
              </Typography.Title>
              <Typography.Paragraph>
                {forum.description}
              </Typography.Paragraph>
            </StyledHeader>
            <Row type="flex" justify="end" style={{ margin: '20px 0' }}>
              <Button type="primary">
                Create New Topic
              </Button>
            </Row>
          </Fragment>
        )}
      />
    </Layout>
  );
};

export default withApollo(Topics);
