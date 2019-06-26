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
              fullName
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
              fullName
            }
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
              fullName
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
              fullName
            }
          }
        }
      }
      ... on ChatNewMessageEvent {
        newMessagePayload: payload {
          _id
          userId
          user {
            _id
            fullName
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
              fullName
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
              fullName
            }
          }
        }
      }
    }
  }
`;
