const getAvatars = users => users.map(user => ({
  src: user.profileImage,
  alt: user.fullName,
}));

export default getAvatars;
