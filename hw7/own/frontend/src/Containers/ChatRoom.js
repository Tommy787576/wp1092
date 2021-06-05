import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useState } from "react";
import { Tabs, Input } from "antd";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const { sendMessage, startChat, messages } = useChat(me);

    const addChatBox = () => { setModalVisible(true); };

    return (
        <> <div className="App-title">
            <h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key);
                        console.log("change to", key);
                        startChat(key);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove") {
                            const newActiveKey = removeChatBox(targetKey, activeKey);
                            setActiveKey(newActiveKey);
                            startChat(newActiveKey);
                        }
                    }}
                >
                    {chatBoxes.map((
                        { friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                {messages.length === 0 ? (
                                    <p>{friend}'s chatbox.</p>
                                ) : (
                                    messages.map(({ name, body }, i) => {
                                    if (name !== me) {
                                        return (
                                            <p className="App-message" key={i}>
                                                <span className="message-sender">{name}</span> 
                                                <span className="message-text">{body}</span>
                                            </p>
                                        )
                                    }
                                    else {
                                        return (
                                            <p className="App-message" style={{textAlign: "right"}} key={i}>
                                                <span className="message-text">{body}</span> 
                                                <span className="message-sender">{name}</span>
                                            </p>
                                        )
                                    }
                                })
                              )}
                            </TabPane>
                        );
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                        startChat(name);
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
                    placeholder=
                    "Enter message here..."
                    onSearch={(msg) => {
                        if (!msg) {
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
                            setMessageInput("");
                            return;
                        }
                        sendMessage({ key: activeKey, body: msg });
                        setMessageInput("");
                    }}

                ></Input.Search>
        </>);
};
export default ChatRoom;

