import React from 'react';

import CompleteProfile from 'modules/Auth/CompleteProfile';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';
import { useRouter } from 'next/router';

const CompleteSignup = () => {
  const { query } = useRouter();

  return (
    <Layout title="Complete Profile" page="complete-profile">
      <CompleteProfile {...query} />
    </Layout>
  );
};

export default withApollo(CompleteSignup);
