

import { gql } from 'apollo-boost';

export const GET_TENDING = gql`
  query trendinftopics {
    trendingTopics {
      id
      title
      body
      replyCount
      user {
        fullName
        profileImage
      }
    }
  }
`;

export const GET_RECENT = gql`
  query recentTopics {
    recentTopics {
      id
      title
      lastUpdatedAt
      replyCount
      user {
        fullName
        profileImage
      },
      users {
        id
        profileImage
      }
    }
  }
`;

export const GET_RECENT_AND_TRENDING = gql`
  query recentAndTrending {
    recentTopics {
      topics {
        id,
        title,
        lastUpdatedAt
        replyCount
        user {
          fullName,
          profileImage,
        },
        users {
          id,
          fullName,
          profileImage,
        }
      }
    }

    trendingTopics {
      id
      title
      body
      replyCount
      user {
        fullName
        profileImage
      }
    }
  }
`;

export default {
  GET_TENDING,
  GET_RECENT,
  GET_RECENT_AND_TRENDING,
};
