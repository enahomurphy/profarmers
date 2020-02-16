import { login } from 'lib/auth';

const handleFbData = (metadata) => {
  const data = {
    fullName: `${metadata.first_name} ${metadata.last_name}`,
    profileImage: metadata.picture.data.url,
  };

  return data;
};

const handleGoogleData = ({ profileObj }) => {
  const data = {
    fullName: `${profileObj.givenName} ${profileObj.familyName}`,
    profileImage: profileObj.imageUrl,
  };

  return data;
};

const loginUser = () => (data, metadata, type) => {
  if (data.signedUp || type === 'login') {
    return login(data, '/feed');
  }

  let query = {};

  if (type === 'facebook') {
    query = handleFbData(metadata);
  }

  if (type === 'google') {
    query = handleGoogleData(metadata);
  }

  return login(data, '/signup/complete', query);
};

export default loginUser;
