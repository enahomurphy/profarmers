import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import withApollo from 'lib/apollo';
import Layout from 'components/Layout';
import List from 'components/Layout/List';
import TopicHeader from 'components/Headers/TopicHeader';
import ReplyList from 'components/List/ReplyList';
import { query as topicQuery } from 'lib/graphql/topic';

const Topics = () => {
  const { query } = useRouter();
  const {
    data: { topic, replies }, loading, hasNext, fetchMore,
  } = topicQuery.useGetTopic(query.topicId);

  return (
    <Layout page="topics" title="topics">
      <Fragment>
        <TopicHeader
          user={topic.user}
          topic={topic}
        />
        <List
          data={replies}
          handleInfiniteOnLoad={fetchMore}
          loading={loading}
          hasNext={hasNext}
          getLink={item => `/forum/${item.id}/topics/${item.id}`}
          ListItem={ReplyList}
        />
      </Fragment>
    </Layout>
  );
};

export default withApollo(Topics);
