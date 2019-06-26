import gql from "graphql-tag";

export default gql`
  mutation updateChatRooms($index: ID!, $value: ChatRoom) {
    updateChatRooms(index: $index, value: $value)
  }
`;
