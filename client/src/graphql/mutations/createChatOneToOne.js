import gql from "graphql-tag";

export default gql`
  mutation createOneToOneChatRoom($targetUserId: ID!) {
    createOneToOneChatRoom(targetUserId: $targetUserId) {
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
