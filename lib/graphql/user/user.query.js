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

export const GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
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

export const GET_USER_CONNECTION = gql`
  query userConnection($userId: Int!, $connectionId: Int!) {
    userConnection(userId: $userId, connectionId: $connectionId) {
      senderId
      receiverId
      accepted
    }
  }
`;

export const GET_SUGGESTED_CONNECTION = gql`
  query getsuggestedConnections($limit: Int, $page: Int) {
    suggestedConnections(limit: $limit, page: $page) {
      suggestions {
        id
        fullName
        profileImage
        personal
      }
    }
  }
`;

export default {
  GET_SUGGESTED_CONNECTION,
  GET_USER,
  GET_USER_CONNECTION,
  ME,
  UPDATE_USER,
  USER_CONNECTIONS,
};
