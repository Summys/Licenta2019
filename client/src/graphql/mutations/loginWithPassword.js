import gql from "graphql-tag";

export default gql`
  mutation loginWithPassword($username: String, $plainPassword: String) {
    loginWithPassword(username: $username, plainPassword: $plainPassword) {
      id
      token
    }
  }
`;
