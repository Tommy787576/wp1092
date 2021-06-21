import Message from "./Message"
import { useEffect, useState, useRef } from "react"
import { CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from "../graphql"
import { useQuery } from '@apollo/react-hooks';
import { Divider } from 'antd';

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ChatBox = ({me, friend, onNewMessage, unread }) => {
  
  const prevUnread = usePrevious(unread);

  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name: makeName(me, friend)
    }
  });
  
  // useEffect(() => {
  //   console.log(`Room ${makeName(me, friend)} Previous: ${prevUnread}, Current: ${unread}`);
  // })

  useEffect(() => {
    try{
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: {name: makeName(friend, me)},
        updateQuery: (prev, { subscriptionData }) => {
          if(!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.chatBox.data;
          return {
            chatBox: {
              ...prev.chatBox,
              messages: [...prev.chatBox.messages, newMessage],
            }
          };
        },
      });
    }
    catch (e) {
      throw new Error(e);
    }
  }, [subscribeToMore])
  
  useEffect(() => {
    if(!loading && !error){
      onNewMessage(makeName(me, friend));
    }
  }, [data]);

  return (
    loading ?
    <p> Loading </p> :
    error ? 
    <p> Error ! </p> :
    data.chatBox.messages.length === 0 ? 
    <p>No message in {friend}'s chatbox.</p> :
    data.chatBox.messages.map((msg, i) => {
      const unreadLine = data.chatBox.messages.length - i === prevUnread ? <Divider id={makeName(friend, me)+'_unread'}>Unread Messages</Divider> : null;
      console.log(msg.id);
      return (
        <>
          {unreadLine}
          <Message classText={makeName(me, friend)+'_msg'} key={i} me={me} author={msg.sender.name} text={msg.body}/>
        </>
      )
    })
  )
}

export default ChatBox;
