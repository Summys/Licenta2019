/* eslint-disable import/no-extraneous-dependencies */
import gql from "graphql-tag";

export default gql`
  fragment chat on ChatRoom {
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
`;
