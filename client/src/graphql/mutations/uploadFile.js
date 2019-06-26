import gql from 'graphql-tag';

export default gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      _id
      filename
      mimetype
      path
      createdAt
    }
  }
`;
