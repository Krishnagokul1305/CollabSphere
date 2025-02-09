import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: Login!) {
    login(input: $input) {
      success
      message
      user {
        id
        name
        email
        role
      }
    }
  }
`;
