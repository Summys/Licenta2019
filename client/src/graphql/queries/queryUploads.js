/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export default gql`
  query uploads($filters: JSON, $options: JSON) {
    uploads(filters: $filters, options: $options) {
      _id
      filename
      mimetype
      path
      createdAt
    }
  }
`;
