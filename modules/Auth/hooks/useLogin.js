import { login } from 'lib/auth';

const handleFbData = (metadata) => {
  const data = {
    fullName: `${metadata.first_name} ${metadata.last_name}`,
    profileImage: metadata.picture.data.url,
  };

  return data;
};

const loginUser = () => (data, metadata) => {
  if (data.signedUp) {
    return login(data, '/feed');
  }

  return login(data, '/signup/complete', handleFbData(metadata));
};

export default loginUser;
