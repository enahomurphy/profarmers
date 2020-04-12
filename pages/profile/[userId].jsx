import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Spin, Row } from 'antd';

import userGql from 'lib/graphql/user';
import topicGQL from 'lib/graphql/topic/topic.query/index';
import withApollo from 'lib/apollo';
import get from 'lib/utils/get';

import UserProfile from 'modules/Profile/UserProfile';
import Layout from 'components/Layout';

const GetUser = () => {
  const { query } = useRouter();

  const { data, loading } = useQuery(
    userGql.query.USER_CONNECTIONS, { variables: { limit: 10, page: 1 } },
  );

  const { data: currentUser, loading: userLoading } = useQuery(
    userGql.query.GET_USER, { variables: { id: query.userId } },
  );
  const { data: topicData, loading: topicLoading } = useQuery(
    topicGQL.GET_RECENT_QUERY,
  );
  const { data: me } = useQuery(
    userGql.query.ME,
  );

  const connections = get(data, 'userConnections.connections', []);
  const recentTopics = get(topicData, 'topics.topics', []);
  const user = get(currentUser, 'user', {});
  const loggedInuser = get(me, 'me', {});
  const userInfo = get(currentUser, 'userInfo', {});

  const { data: connectionStatus } = useQuery(
    userGql.query.GET_USER_CONNECTION, {
      variables: {
        userId: parseInt(loggedInuser.id, 10),
        connectionId: parseInt(query.userId, 10),
      },
    },
  );

  const userConnection = get(connectionStatus, 'userConnection', {});

  const connectionState = (state) => {
    if (state) return { text: 'Message', color: '#fff', background: '#488B49' };
    if (state === null) return { text: 'Connect', color: '#fff', background: '#488B49' };
    return { text: 'Pending', color: '#488B49', background: 'rgba(72, 139, 73, 0.2)' };
  };

  const returnData = user
    ? (
      <UserProfile
        connectionsLoading={loading}
        topicLoading={topicLoading}
        connections={connections}
        userInfo={userInfo}
        user={user}
        recentTopics={recentTopics}
        buttonProp={connectionState(userConnection.accepted)}
      />
    ) : (
      <Layout page="profile" title="profile">
        <Row type="flex" justify="center" style={{ marginTop: '10%' }}>
          Oops! User Not Found :(
        </Row>
      </Layout>
    );

  return !userLoading ? returnData : (
    <Layout page="profile" title="profile">
      <Row type="flex" justify="center">
        <Spin />
      </Row>
    </Layout>
  );
};

export default withApollo(GetUser);
