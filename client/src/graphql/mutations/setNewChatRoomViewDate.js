import gql from "graphql-tag";

export const setNewChatRoomViewDate = gql`
  mutation setNewChatRoomViewDate($chatRoomId: ID!) {
    setNewChatRoomViewDate(chatRoomId: $chatRoomId) {
      _id
    }
  }
`;
