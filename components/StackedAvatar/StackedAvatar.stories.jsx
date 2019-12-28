import React from 'react';

import StackedAvatar from './StackedAvatar';

export default {
  title: 'StackedAvatar',
};

const avatars = [
  {
    src: 'https://randomuser.me/api/portraits/men/47.jpg',
    alt: '47 man',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/49.jpg',
    alt: '48 man',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/48.jpg',
    alt: '49 man',
  },
  {
    src: '',
    alt: '50 man',
  },
];

export const stackedAvatar = () => (
  <div style={{ margin: '20px' }}>
    <StackedAvatar
      avatars={avatars}
      count={4000}
    />
  </div>
);
