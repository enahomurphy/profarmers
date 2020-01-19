import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import withApollo from 'lib/apollo';
import topicGQL from 'lib/graphql/topic'; import get from 'lib/utils/get';
import TrendingTopic from 'modules/Topics/TrendingTopic';
import RecentTopics from 'modules/Topics/RecentTopics';

const Feed = () => {
  const { data, loading } = useQuery(topicGQL.query.GET_RECENT_AND_TRENDING);
  const trendingTopics = get(data, 'trendingTopics', []);
  const recentTopics = get(data, 'recentTopics', []);
  console.info(recentTopics[0]);
  return (
    <div>
      <TrendingTopic
        topics={trendingTopics}
        loading={loading}
      />
      <RecentTopics
        topics={recentTopics}
        loading={loading}
        handleInfiniteOnLoad={() => {}}
      />
    </div>
  );
};

export default withApollo(Feed);
