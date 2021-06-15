import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query chatBoxQuery(
        $name1: String
        $name2: String
    ) {
        chatBoxQuery(
            name1: $name1
            name2: $name2
        ){
            id
            name
            messages {
                id
                sender
                body
            }
        }
    }
`;
