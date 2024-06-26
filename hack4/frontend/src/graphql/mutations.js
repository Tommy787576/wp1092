import { gql } from '@apollo/client';

export const INSERTPEOPLE_MUTATION = gql`
  mutation insertPeople(
      $data: [Person]
  ) {
    insertPeople(
        data: $data
    )
  }
`;
