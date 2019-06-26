

import gql from "graphql-tag";

export default gql`
mutation createMessage($input: CreateMessageMutationInput!) {
    createMessage(input: $input) {
      _id
    }
  }
`;
