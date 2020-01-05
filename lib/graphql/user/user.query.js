import { gql } from 'apollo-boost';

export const UPDATE_USER = gql`
  mutation updateUser($payload: UserUpdateInput) {
    updateUser(payload: $payload) {
      id,
    }
  }
`;

export default {
  UPDATE_USER,
};
