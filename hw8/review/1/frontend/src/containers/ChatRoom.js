import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Button, Badge } from "antd";
import { useQuery, useMutation } from '@apollo/react-hooks';

import ChatModal from "../components/ChatModal"
import ChatBox from "../components/ChatBox"
import useChatBox from "../hooks/useChatBox";

import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";

const { TabPane } = Tabs;

const LOCALSTORAGE_KEY = "save-chatBoxes-hw8";

const ChatRoom = ({ me, displayStatus }) => {

  const savedChatBoxes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const {chatBoxes, createChatBox, removeChatBox, updateUnread, setUnread } = useChatBox(savedChatBoxes !== null && savedChatBoxes.me === me ? savedChatBoxes.chatBoxes : []);
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  
  const addChatBox = () => { setModalVisible(true); };
  
  const handleNewMessage = (key) => {
    if(key !== activeKey){
      updateUnread(key, 1);
    }
    else{
      scrollToBottom();
    }
  }
  
  const scrollToBottom = () => {
    let element = document.getElementById(activeKey+'_unread');
    if(element !== null){
      element.scrollIntoView();
    }
    else{
      element = document.getElementsByClassName(activeKey+'_msg');
      if(element.length !== 0){
        element = element[element.length-1];
        element.scrollIntoView();
      }
    }
  }

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({me: me, chatBoxes: chatBoxes}));
  }, [chatBoxes])

  useEffect(() => {
    if(savedChatBoxes !== null && savedChatBoxes.me === me && savedChatBoxes.chatBoxes.length !== 0){
      setActiveKey(savedChatBoxes.chatBoxes[0].key)
    }
  }, [])
  
  useEffect(() => {
    setUnread(activeKey, 0);
    scrollToBottom();
  }, [activeKey])

  return (
    <> 
      <div className="App-title">
        <h1>{me}'s Chat Room</h1> 
      </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card" 
          className="my-ant-tabs"
          onEdit={(targetKey, action) => {
            if (action === "add") 
              addChatBox();
            else if (action === "remove") 
              setActiveKey(removeChatBox(activeKey, targetKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
        >
          {chatBoxes.map(({ friend, key, unread }) => {
            return (
              <Tabs.TabPane tab={<Badge count={unread} offset={[5, -6]} size="small">{friend}</Badge>} key={key} closable={true}>
                <ChatBox me={me} friend={friend} key={key} onNewMessage={handleNewMessage} unread={unread}/>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          displayStatus={displayStatus}
          onCreate={async ({ name }) => {
            if(chatBoxes.filter(chatBox => chatBox.friend === name).length){
              displayStatus({
                type: 'error',
                msg: `Chat Room with ${name} has been opened`,
              })
              return;
            }
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
            await startChat({
              variables: {
                name1: name,
                name2: me,
              },
            });
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.TextArea
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        autoSize={true}
        placeholder="Enter message here..."
      ></Input.TextArea>
      <Button 
        className='send-button'
        type="primary" block
        onClick={() => {
          if (!messageInput) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            return;
          }
          const tmp = activeKey.split('_');
          const reciever = tmp[0] === me ? tmp[1] : tmp[0];
          sendMessage({
            variables: {
              sender: me,
              reciever: reciever,
              body: messageInput,
            }
          });
          setMessageInput("");
        }}
      >Send</Button>
    </>
  );
};
export default ChatRoom;
