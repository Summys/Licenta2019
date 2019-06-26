import gql from "graphql-tag";

export default gql`
  subscription chat {
    chat {
      ... on ChatRootEvent {
        chatPayload: payload {
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
            missedMessageCount
          }
        }
      }
      ... on ChatNewRoomEvent {
        newRoomPayload: payload {
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
            missedMessageCount
          }
        }
      }
      ... on ChatNewMessageEvent {
        newMessagePayload: payload {
          _id
          userId
          user {
            _id
            username
          }
          chatRoomId
          text
          createdAt
        }
      }
      ... on ChatRoomUpdatedEvent {
        updateRoomPayload: payload {
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
            missedMessageCount
          }
        }
      }
    }
  }
`;
