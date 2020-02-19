import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import usePagination from 'lib/graphql/helper/userPagination';
import get from 'lib/utils/get';
import { GET } from './query';

export default (id) => {
  const [getTopic, { loading, data, fetchMore }] = useLazyQuery(GET, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (id) {
      getTopic();
    }
  }, [getTopic, id]);

  const topic = get(data, 'topic', { forum: {}, user: {} });
  const { replies = [], pageInfo = { hasNext: true } } = get(data, 'replies', { user: {} });

  const handleFetchMore = usePagination(fetchMore, {
    nextPage: pageInfo.page,
    path: 'replies.replies',
  });

  return {
    data: { topic, replies }, loading, fetchMore: handleFetchMore, hasNext: pageInfo.hasNext,
  };
};
