import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import usePagination from 'lib/graphql/helper/userPagination';
import get from 'lib/utils/get';
import { GET_RECENT } from 'lib/graphql/topic/topic.query/query';
import { GET_FORUM } from './query';

const QUERY = gql`
  query data($forumId: Int, $id: Int, $page: Int) {
    ${GET_RECENT}
    ${GET_FORUM}
  }
`;

export default (forumId) => {
  const [getForum, { loading, data, fetchMore }] = useLazyQuery(QUERY, {
    variables: { forumId, id: forumId, page: 1 },
  });

  useEffect(() => {
    if (forumId) {
      getForum();
    }
  }, [forumId, getForum]);

  const forum = get(data, 'forum', {});
  const topics = get(data, 'topics.topics', []);
  const pageInfo = get(data, 'topics.pageInfo', { hasNext: true });

  const handleFetchMore = usePagination(fetchMore, {
    nextPage: pageInfo.page,
    path: 'topics.topics',
  });

  return {
    data: { forum, topics }, loading, fetchMore: handleFetchMore, hasNext: pageInfo.hasNext,
  };
};
