import gql from "graphql-tag";

export default gql`
  query chat {
    chat {
      _id
      createdAt
      messages {
        _id
        userId
        user {
          _id
          username
        }
        text
        createdAt
      }
      metaData {
        lastMessage {
          text
          createdAt
        }
        partner {
          _id
          username
        }
      }
    }
  }
`;
