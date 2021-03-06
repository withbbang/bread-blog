import { gql } from "graphql-tag";

export const REQUEST_LOGIN = gql`
  mutation requestLogin($email: String!) {
    requestLogin(email: $email) {
      name
      email
      avatar
    }
  }
`;

export const CONFIRM_LOGIN = gql`
  mutation confirmLogin($input: ConfirmLoginInput!) {
    confirmLogin(input: $input) {
      token
      refreshToken
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      email
      name
      avatar
    }
  }
`;

export const GET_VISITOR = gql`
  query getVisitor {
    getVisitor {
      totalCount
      todayCount
    }
  }
`;

export const SET_VISITOR = gql`
  mutation setVisitor {
    setVisitor
  }
`;
