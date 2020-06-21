

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
  query topics {
    topics {
      pageInfo {
        page
        hasNext
      }
      topics {
        id
        title
        lastUpdatedAt
        replyCount
        user {
          fullName
          profileImage
        }
      }
    }
  }
`;

export const GET_RECENT_AND_TRENDING = gql`
  query recentAndTrending {
    topics {
      pageInfo {
        page
        hasNext
      }
      topics {
        id,
        title,
        lastUpdatedAt
        replyCount
        users {
          fullName,
          profileImage,
        }
        user {
          fullName,
          profileImage,
        }
      },
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
