import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import withApollo from 'lib/apollo';
import topicGQL from 'lib/graphql/topic'; import get from 'lib/utils/get';
import TrendingTopic from 'modules/Topics/TrendingTopic';
import RecentTopics from 'modules/Topics/RecentTopics';
import Layout from 'components/Layout';

const Feed = () => {
  const { data, loading } = useQuery(topicGQL.query.GET_RECENT_AND_TRENDING);
  const trendingTopics = get(data, 'trendingTopics', []);
  const recentTopics = get(data, 'recentTopics.topics', []);
  return (
    <Layout page="feed" title="feed">
      <TrendingTopic
        topics={trendingTopics}
        loading={loading}
      />
      <RecentTopics
        topics={recentTopics}
        loading={loading}
        handleInfiniteOnLoad={() => {}}
      />
    </Layout>
  );
};

export default withApollo(Feed);
