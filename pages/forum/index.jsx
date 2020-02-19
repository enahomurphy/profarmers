import React from 'react';

import withApollo from 'lib/apollo';
import { query } from 'lib/graphql/forum';
import Layout from 'components/Layout';
import List from 'components/Layout/List';
import ForumList from 'components/List/ForumList';

const Forum = () => {
  const {
    loading, data, fetchMore, hasNext,
  } = query.useGetForums();

  return (
    <Layout page="forum" title="forum">
      <List
        data={data.forums}
        loading={loading}
        handleInfiniteOnLoad={fetchMore}
        hasNext={hasNext}
        ListItem={ForumList}
        title="Recent Discussion"
        getLink={item => `/forum/${item.id}`}
      />
    </Layout>
  );
};

export default withApollo(Forum);
