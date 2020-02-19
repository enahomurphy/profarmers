import React from 'react';
import { useRouter } from 'next/router';

import withApollo from 'lib/apollo';
import { useGetTopic } from 'lib/graphql/topic/topic.query';
import Layout from 'components/Layout';
import TopicHeader from 'components/Headers/TopicHeader';
import Replies from 'modules/Topics/Replies';

const Topics = () => {
  const { query } = useRouter();
  const { data: { topic, replies }, loading, hasNext } = useGetTopic(query.topicId);
  return (
    <Layout page="topics" title="topics">
      <TopicHeader
        user={topic.user}
        topic={topic}
      />
      <Replies
        replies={replies}
        handleInfiniteOnLoad={() => {}}
        loading={loading}
        hasMore={hasNext}
      />
    </Layout>
  );
};

export default withApollo(Topics);
