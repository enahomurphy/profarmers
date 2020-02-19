import { useQuery } from '@apollo/react-hooks';

import usePagination from 'lib/graphql/helper/userPagination';
import get from 'lib/utils/get';
import { GET_ALL_FORUM } from './query';

export default () => {
  const { loading, data, fetchMore } = useQuery(GET_ALL_FORUM);

  const forums = get(data, 'forums.forums', []);
  const pageInfo = get(data, 'forums.pageInfo', { hasNext: true });

  const handleFetchMore = usePagination(fetchMore, {
    nextPage: pageInfo.page,
    path: 'forums.forums',
  });

  return {
    data: { forums }, loading, fetchMore: handleFetchMore, hasNext: pageInfo.hasNext,
  };
};
