import React from 'react';

import PreviewList from './PreviewList';
import ReplyList from './ReplyList';

export default {
  title: 'List',
};


const previewListData = {
  loading: false,
  title: 'Growing cashew in the south',
  reply: 'I think that it’s possible to grow cashew in the south but you have to be extra careful',
  user: {
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Tracy Murphy',
    lastSeen: '3 hrs ago',
  },
  replies: {
    totalCount: 2000,
    lastReplies: [
      {
        title: '',
        reply: '',
        user: {
          image: 'https://randomuser.me/api/portraits/men/47.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
        },
      },
      {
        title: '',
        reply: '',
        user: {
          image: 'https://randomuser.me/api/portraits/men/48.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
        },
      },
      {
        title: '',
        reply: '',
        user: {
          image: 'https://randomuser.me/api/portraits/men/49.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
        },
      },
    ],
  },
};

export const previewList = () => (
  <div style={{ margin: '20px' }}>
    <PreviewList {...previewListData} />
  </div>
);

export const replyList = () => (
  <div style={{ margin: '20px' }}>
    <ReplyList {...previewListData} />
  </div>
);
