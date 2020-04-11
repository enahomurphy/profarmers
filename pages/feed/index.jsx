import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import withApollo from 'lib/apollo';
import topicGQL from 'lib/graphql/topic'; import get from 'lib/utils/get';
import TrendingTopic from 'modules/Topics/TrendingTopic';
import RecentTopics from 'modules/Topics/RecentTopics';
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import Search from 'components/Search';

const Feed = () => {
  const { data, loading, fetchMore } = useQuery(topicGQL.query.GET_RECENT_AND_TRENDING);
  const { query } = useRouter();
  const trendingTopics = get(data, 'trendingTopics', []);
  const recentTopics = get(data, 'recentTopics.topics', []);
  const nextPage = get(data, 'recentTopics.pageInfo.page', 0);
  const hasMore = get(data, 'recentTopics.pageInfo.hasNext', true);

  return (
    <Layout page="feed" title="feed">
      <TrendingTopic
        topics={trendingTopics}
        loading={loading}
      />
      <RecentTopics
        topics={recentTopics.topics}
        loading={loading}
        hasMore={hasMore}
        handleInfiniteOnLoad={() => {
          fetchMore({
            query: topicGQL.query.GET_RECENT_QUERY,
            variables: { page: nextPage },
            updateQuery(prev, { fetchMoreResult }) {
              if (!fetchMoreResult) return prev;
              const fetchMoreTopics = get(fetchMoreResult, 'recentTopics.topics', []);
              const prevForumsTopics = get(prev, 'recentTopics.topics', []);
              return Object.assign(
                {},
                prev,
                {
                  recentTopics: {
                    ...fetchMoreResult.recentTopics,
                    topics: [...prevForumsTopics, ...fetchMoreTopics],
                  },
                },
              );
            },
          });
        }}
      />
      {
        query.search
        && <Modal><Search /></Modal>
      }
    </Layout>
  );
};

export default withApollo(Feed);
