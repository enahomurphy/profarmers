import React from 'react';
import PropTypes from 'prop-types';

import CompleteProfileForm from './CompleteProfileForm';
import FormWrapper from '../FormWrapper';

const CompleteProfile = props => (
  <FormWrapper
    title="Complete Profile"
    subTitle="Thank you for signing up please complete your profile to continue"
  >
    <CompleteProfileForm {...props} />
  </FormWrapper>
);

CompleteProfile.defaultProps = {
  fullName: '',
  profileImage: '',
};

CompleteProfile.propTypes = {
  fullName: PropTypes.string,
  profileImage: PropTypes.string,
};

export default CompleteProfile;
