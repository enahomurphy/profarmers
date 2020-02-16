import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

export const SOCIAL_SIGNUP = gql`
  mutation socialSignup($accessToken: String!, $type: String!) {
    socialSignup(accessToken: $accessToken, type: $type) {
      token
      signedUp
    }
  }
`;

export default {
  LOGIN,
  SIGNUP,
  SOCIAL_SIGNUP,
};
