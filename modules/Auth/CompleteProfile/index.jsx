import React from 'react';

import CompleteProfileForm from './CompleteProfileForm';
import FormWrapper from '../FormWrapper';

const CompleteProfile = () => (
  <FormWrapper
    title="Complete Profile"
    subTitle="Thank you for signing up please complete your profile to continue"
  >
    <CompleteProfileForm />
  </FormWrapper>
);

export default CompleteProfile;
