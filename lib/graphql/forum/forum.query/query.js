import { gql } from 'apollo-boost';

export const GET_ALL_FORUM = gql`
  query forums($page: Int) {
    forums(page: $page) {
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

export const GET_FORUM = `
  forum(id: $id) {
    id
    title
    description
  }
`;

export default {
  GET_ALL_FORUM,
  GET_FORUM,
};
