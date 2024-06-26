import { gql } from '@apollo/client';

export const CREATE_CHAT_BOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String
        $name2: String
    ) {
        createChatBox(
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

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $name1: String
        $name2: String
        $body: String
    ) {
        createMessage(
            name1: $name1
            name2: $name2
            body: $body
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