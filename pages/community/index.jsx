import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Divider } from 'antd';

import Layout from 'components/Layout';
import userGql from 'lib/graphql/user';
import withApollo from 'lib/apollo';
import get from 'lib/utils/get';

import ConnectedCard from 'components/List/Cards/ConnectedCard';
import ConnectionCard from 'components/List/Cards/ConnectionCard';

const ConnectionsAndTopicsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  width: 75%;

  section {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #303030;
    width: 351px;

    h5 {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
  }

  section:first-child {
    div {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 480px) {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 70%;
    display: block;
  }
`;

const ConnectedCardWrapper = styled(ConnectedCard)`
  border: none;
  color: red;
  background: blue;
`;

const Community = () => {
  const { data, loading: connectionsLoading } = useQuery(
    userGql.query.USER_CONNECTIONS, { variables: { limit: 10, page: 1 } },
  );

  const { data: suggestedConnections, loading: suggestionsLoading } = useQuery(
    userGql.query.GET_SUGGESTED_CONNECTION,
  );

  const suggestions = get(suggestedConnections, 'suggestedConnections.suggestions', []);

  const connections = get(data, 'userConnections.connections', []);

  return (
    <Layout page="community" title="community">
      <h1 style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>Community</h1>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ConnectionsAndTopicsWrapper>
          <section>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Suggested Connections</h4>
              <h5>See All</h5>
            </header>
            <div>
              {
                !!suggestions.length
                && suggestions.map(conn => (
                  <div style={{ marginBottom: 16 }}>
                    <ConnectionCard
                      user={conn}
                      replies={{ totalCount: 300 }}
                      loading={suggestionsLoading}
                    />
                  </div>
                ))
              }
            </div>
          </section>
          <Divider type="vertical" style={{ border: '1px solid #DBDBDB', height: 'auto', marginTop: 33 }} />
          <section>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Connections</h4>
            </header>
            {
              !connectionsLoading
              && connections.map(conn => (
                <div style={{ marginBottom: 16 }}>
                  <ConnectedCardWrapper
                    user={conn}
                    replies={{ totalCount: 300 }}
                    loading={connectionsLoading}
                  />
                </div>
              ))
            }
          </section>
        </ConnectionsAndTopicsWrapper>
      </div>
    </Layout>
  );
};

export default withApollo(Community);
