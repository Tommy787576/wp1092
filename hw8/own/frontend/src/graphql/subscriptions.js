import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
    subscription comment($postId: String!){
        comment(postId: $postId){
            mutation
            data {
                id
                name
                messages {
                    id
                    sender
                    body
                }
            }
        }
    }
`;
