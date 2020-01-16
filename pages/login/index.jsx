
import React from 'react';

import { withUnAuth } from 'lib/auth';
import Login from 'modules/Auth/Login';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const LoginPage = () => (
  <Layout title="sign in" page="login">
    <Login />
  </Layout>
);

export default withApollo(withUnAuth(LoginPage));
