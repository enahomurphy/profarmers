import React from 'react';

import { withUnAuth } from 'lib/auth';
import Signup from 'modules/Auth/Signup';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const SignupPage = () => (
  <Layout title="sign up" page="signup">
    <Signup />
  </Layout>
);

export default withApollo(withUnAuth(SignupPage));
