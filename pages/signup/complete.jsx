import React from 'react';

import CompleteProfile from 'modules/Auth/CompleteProfile';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const completeSignup = () => (
  <Layout title="Complete Profile" page="complete-profile">
    <CompleteProfile />
  </Layout>
);

export default withApollo(completeSignup);