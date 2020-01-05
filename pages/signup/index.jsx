import React from 'react';

import Signup from 'modules/Signup';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const SignupPage = () => (
  <Layout title="sign up" page="signup">
    <Signup />
  </Layout>
);

export default withApollo(SignupPage);
