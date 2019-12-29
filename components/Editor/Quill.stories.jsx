import React from 'react';

import Quill from './Quill';

export default {
  title: 'Text Editor',
};

export const stackedAvatar = () => (
  <div style={{ margin: '20px' }}>
    <Quill
      onChange={console.info}
      theme="dark"
    />
  </div>
);
