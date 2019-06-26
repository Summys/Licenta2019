import gql from 'graphql-tag';

export default gql`
  mutation storyDelete($storyId: String!) {
    storyDelete(storyId: $storyId) {
      _id
    }
  }
`;
