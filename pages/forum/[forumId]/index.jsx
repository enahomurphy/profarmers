import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Typography, Row, Button } from 'antd';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import withApollo from 'lib/apollo';
import topicGQL from 'lib/graphql/topic';
import formGQl from 'lib/graphql/forum';
import get from 'lib/utils/get';
import RecentTopics from 'modules/Topics/RecentTopics';
import Layout from 'components/Layout';

const StyledHeader = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 30px;
  }
`;

const QUERY = gql`
  query ($forumId: Int, $id: Int, $page: Int) {
    ${topicGQL.query.GET_RECENT}
    ${formGQl.query.GET_FORUM}
  }
`;

const Topics = () => {
  const { query } = useRouter();
  const forumId = parseInt(query.forumId, 10);
  const { data, loading } = useQuery(QUERY, {
    variables: { forumId, id: forumId },
  });

  const recentTopics = get(data, 'recentTopics.topics', []);
  const forum = get(data, 'forum', {});

  return (
    <Layout page="feed" title={`Forum - ${forum.title}`}>
      <RecentTopics
        title=""
        topics={recentTopics}
        loading={loading}
        handleInfiniteOnLoad={() => {}}
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
