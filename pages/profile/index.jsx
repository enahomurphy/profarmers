import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import userGql from 'lib/graphql/user';
import topicGQL from 'lib/graphql/topic/topic.query/index';
import withApollo from 'lib/apollo';
import get from 'lib/utils/get';

import UserProfile from 'modules/Profile/UserProfile';

const Profile = () => {
  const { data, loading } = useQuery(
    userGql.query.USER_CONNECTIONS, { variables: { limit: 10, page: 1 } },
  );

  const { data: currentUser } = useQuery(
    userGql.query.ME,
  );
  const { data: topicData, loading: topicLoading } = useQuery(
    topicGQL.GET_RECENT_QUERY,
  );

  const connections = get(data, 'userConnections.connections', []);
  const recentTopics = get(topicData, 'topics.topics', []);

  const me = get(currentUser, 'me', {});
  const userInfo = get(currentUser, 'userInfo', {});

  return (
    <UserProfile
      connectionsLoading={loading}
      topicLoading={topicLoading}
      connections={connections}
      userInfo={userInfo}
      user={me}
      recentTopics={recentTopics}
    />
  );
};

export default withApollo(Profile);
