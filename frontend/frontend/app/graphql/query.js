const { gql } = require("@apollo/client");

export const userQuery = gql`
  query User {
    user {
      id
      name
      email
      role
    }
  }
`;
