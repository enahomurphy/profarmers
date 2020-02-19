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

export const GET_RECENT = `
  recentTopics(forumId: $forumId, page: $page) {
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
    pageInfo {
      totalCount
      currentPage
      hasNext,
      page
    }
  }
`;

export const GET_RECENT_QUERY = gql`
  query ($forumId: Int, $page: Int) {
    ${GET_RECENT}
  }
`;

export const GET_RECENT_AND_TRENDING = gql`
  query ($forumId: Int, $page: Int) {
    ${GET_RECENT}

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

export const TOPIC_REPLIES = `
  replies(topicId: $id, page: $page) {
    replies {
      id
      text
      user {
        id
        fullName
        profileImage
      }
    }

    pageInfo {
      totalCount
      currentPage
      hasNext,
      page
    }
  }
`;

export const GET = gql`
  query topic($id: ID!, $page: Int) {
    topic(id: $id) {
      id,
      title,
      body
      user {
        id
        fullName
        profileImage
      }
      forum {
        id
        title
      }
    }

    ${TOPIC_REPLIES}
  }
`;

export default {
  GET_TENDING,
  GET_RECENT,
  GET_RECENT_AND_TRENDING,
  GET_RECENT_QUERY,
};
