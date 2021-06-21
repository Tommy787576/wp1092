import "../App.css" ;
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from '../Components/ChatModal.js';
import useChatBox from "../hooks/useChatBox";
import { useMutation } from "@apollo/client";
import { gql } from 'apollo-boost'

const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ){
    createChatBox(
        name1: $name1
        name2: $name2
    ) {
        name
        messages
    }
  }
`
const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $key: String!
    $body: String!
  ){
    createMessage(
        key: $key
        body: $body
    ) {
        sender
        text
    }
  }
`

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const addChatBox = () => { setModalVisible(true); };
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    return (
        <> <div className="App-title"> <h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs 
                    type="editable-card" 
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                    onEdit={(targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove")
                            setActiveKey(removeChatBox(targetKey, activeKey));
                    }} 
                >
                    {chatBoxes.map(( { friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                <p>{friend}'s chatbox.</p>
                            </TabPane>
                        );})}
                </Tabs>
                <ChatModal visible={modalVisible} 
                    onCreate={async ({name}) => {
                        await startChat({
                            variables: {name1: me, name2: name},
                        });
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) =>
                    setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error", 
                            msg: "Please enter message",
                        });
                        return ;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error", 
                            msg: "Please add a chatbox first.",
                        });
                        setMessageInput("");
                        return ;
                    }
                    sendMessage({variables: { key: activeKey, body: msg }});
                    setMessageInput("");
                }}
            ></Input.Search>
        </>
    );
};

export default ChatRoom;