import { gql } from 'apollo-boost';

export const GET_ALL_FORUM = gql`
  query getAllForums($page: Int) {
    getAllForums(page: $page) {
      forums {
        id
        title
        users {
          profileImage
          fullName
        }
        topicCount
      }
      pageInfo {
        totalCount
        currentPage
        hasNext
        page
        hasNext
      }
    }
  }
`;

export default {
  GET_ALL_FORUM,
};
