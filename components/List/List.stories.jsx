import React from 'react';

import PreviewList from './PreviewList';
import ReplyList from './ReplyList';
import TopicCardList from './Cards/TopicCard';
import ConnectedCard from './Cards/ConnectedCard';
import ConnectionCard from './Cards/ConnectionCard';

export default {
  title: 'List',
};

const previewListData = {
  loading: false,
  title: 'Growing cashew in the south',
  reply: 'I think that it’s possible to grow cashew in the south but you have to be extra careful',
  details: `Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
    a design language for background applications, is refined by Ant UED Team. Ant Design, a
    design language for background applications, is refined by Ant UED Team. Ant Design, a design
    language for background applications, is refined by Ant UED Team. Ant Design, a design
    language for background applications, is refined by Ant UED Team.
  `,
  user: {
    profileImage: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Racheal Ejutemidien',
    lastSeen: '3 hrs ago',
    personal: 'farmer',
  },
  replyCount: 2000,
  replies: {
    totalCount: 2000,
    lastReplies: [
      {
        title: '',
        reply: '',
        user: {
          profileImage: 'https://randomuser.me/api/portraits/men/47.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
          personal: 'farmer',
        },
      },
      {
        title: '',
        reply: '',
        user: {
          profileImage: 'https://randomuser.me/api/portraits/men/48.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
        },
      },
      {
        title: '',
        reply: '',
        user: {
          profileImage: 'https://randomuser.me/api/portraits/men/49.jpg',
          name: 'Enaho Murphy',
          lastSeen: '3 hrs ago',
        },
      },
    ],
  },
  users: [
    {
      profileImage: 'https://randomuser.me/api/portraits/men/47.jpg',
      name: 'Racheal Ejutemidien',
      personal: 'farmer',
    },
    {
      profileImage: 'https://randomuser.me/api/portraits/men/48.jpg',
      name: 'Enaho Murphy',
      lastSeen: '3 hrs ago',
    },
    {

      profileImage: 'https://randomuser.me/api/portraits/men/49.jpg',
      name: 'Enaho Murphy',
      lastSeen: '3 hrs ago',
    },
  ],
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
export const topicCardList = () => (
  <div style={{ margin: '20px' }}>
    <TopicCardList {...previewListData} />
  </div>
);

export const connectedCardList = () => (
  <div style={{ margin: '20px' }}>
    <ConnectedCard {...previewListData} />
  </div>
);

export const connectionCardList = () => (
  <div style={{ margin: '20px' }}>
    <ConnectionCard {...previewListData} />
  </div>
);
