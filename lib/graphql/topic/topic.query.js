import { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

import get from 'lib/utils/get';

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

export const useGetTopic = (id) => {
  const [getTopic, { loading, data, fetchMore }] = useLazyQuery(GET, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (id) {
      getTopic();
    }
  }, [getTopic, id]);

  const topic = get(data, 'topic', { forum: {}, user: {} });
  const { replies = [], pageInfo = { hasNext: true } } = get(data, 'replies', { user: {} });


  const handleFetchMore = async () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          page: pageInfo.nextPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const { replies: newReplies } = get(data, 'replies', {});
          const { replies: prevReplies } = get(prev, 'replies', {});
          return Object.assign(
            {},
            prev,
            {
              getAllForums: {
                ...fetchMoreResult.getAllForums,
                forums: [...prevReplies, ...newReplies],
              },
            },
          );
        },
      });
    }
  };

  return {
    data: { topic, replies }, loading, fetchMore: handleFetchMore, hasNext: pageInfo.hasNext,
  };
};

export default {
  GET_TENDING,
  GET_RECENT,
  GET_RECENT_AND_TRENDING,
  GET_RECENT_QUERY,
  useGetTopic,
};
