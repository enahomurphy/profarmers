import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import withApollo from 'lib/apollo';
import forumGQL from 'lib/graphql/forum';
import get from 'lib/utils/get';
import Forums from 'modules/Forum/Forums';
import Layout from 'components/Layout';

const Forum = () => {
  const [loadForums, { loading, data, fetchMore }] = useLazyQuery(forumGQL.query.GET_ALL_FORUM);
  const result = get(data, 'getAllForums.forums', []);
  const hasMore = get(data, 'getAllForums.pageInfo.hasNext', true);
  const nextPage = get(data, 'getAllForums.pageInfo.page', 0);

  const handleInfiniteOnLoad = async () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          page: nextPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const fetchMoreForums = get(fetchMoreResult, 'getAllForums.forums', []);
          const prevForums = get(prev, 'getAllForums.forums', []);
          return Object.assign(
            {},
            prev,
            {
              getAllForums: {
                ...fetchMoreResult.getAllForums,
                forums: [...prevForums, ...fetchMoreForums],
              },
            },
          );
        },
      });
    }
  };

  useEffect(() => {
    loadForums();
  }, [loadForums]);

  return (
    <Layout page="forum" title="forum">
      <Forums
        forums={result}
        loading={loading}
        handleInfiniteOnLoad={handleInfiniteOnLoad}
        hasMore={hasMore}
      />
    </Layout>
  );
};

export default withApollo(Forum);
