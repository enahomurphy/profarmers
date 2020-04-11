import { gql } from 'apollo-boost';

export const UPDATE_USER = gql`
  mutation updateUser($payload: UserUpdateInput) {
    updateUser(payload: $payload) {
      id,
    }
  }
`;

export const USER_CONNECTIONS = gql`
  query userConnections($limit: Int, $page: Int) {
    userConnections(limit: $limit, page: $page) {
      connections {
        fullName
        occupation
        personal
        profileImage
      }
    }
  }
`;

export const ME = gql`
  query userData {
    me {
      id
      fullName
      profileImage
      email
      bio
    }
    userInfo {
      connectionCount
      disscussionCount
      topicsCount
    }
  }
`;

export default {
  ME,
  UPDATE_USER,
  USER_CONNECTIONS,
};
