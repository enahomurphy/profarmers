import React from 'react';

import Login from 'modules/Auth/Login';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const SignupPage = () => (
  <Layout title="sign in" page="login">
    <Login />
  </Layout>
);

export default withApollo(SignupPage);
