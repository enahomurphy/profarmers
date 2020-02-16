import React from 'react';
import PropTypes from 'prop-types';

import CompleteProfile from 'modules/Auth/CompleteProfile';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';

const CompleteSignup = ({ url }) => (
  <Layout title="Complete Profile" page="complete-profile">
    <CompleteProfile {...url.query} />
  </Layout>
);

CompleteSignup.propTypes = {
  url: PropTypes.object.isRequired,
};

export default withApollo(CompleteSignup);
