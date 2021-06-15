import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    CREATE_CHAT_BOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    CHATBOX_SUBSCRIPTION,
    CHATBOX_QUERY
} from '../graphql';

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const [messages, setMessages] = useState([]);

    const addChatBox = () => { setModalVisible(true); };
    const [startChat] = useMutation(CREATE_CHAT_BOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, { variables: { name1: me, name2: activeKey } });
    console.log(activeKey);

    useEffect(() => {
        let unsubscribe;

        try {
            const name = makeName(me, activeKey);
            console.log(name);
            if (activeKey) {
                unsubscribe = subscribeToMore({
                    document: CHATBOX_SUBSCRIPTION,
                    variables: { postId: name },
                    // variables: { postId: makeName("Timmy", "Mary") },
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data)
                            return prev;

                        const temp = subscriptionData;
                        setMessages(temp.data.comment.data.messages);

                        return temp;
                    },
                    onError: err => console.log(err)
                });
            }
        } catch (e) {
            console.log(e);
        }

        if (unsubscribe)
            return () => unsubscribe()
    }, [subscribeToMore, activeKey]);

    return (
        <> <div className="App-title">
            <h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={async (key) => {
                        setActiveKey(key);
                        const temp = await startChat({
                            variables: {
                                name1: me,
                                name2: key
                            }
                        })
                        setMessages(temp.data.createChatBox.messages);
                    }}
                    onEdit={async (targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove") {
                            const newActiveKey = removeChatBox(targetKey, activeKey);
                            setActiveKey(newActiveKey);
                            if (newActiveKey) {
                                const temp = await startChat({
                                    variables: {
                                        name1: me,
                                        name2: newActiveKey
                                    }
                                })
                                setMessages(temp.data.createChatBox.messages);
                            }
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
                                    messages.map(({ sender, body }, i) => {
                                        if (sender !== me) {
                                            return (
                                                <p className="App-message" key={i}>
                                                    <span className="message-sender">{sender}</span>
                                                    <br />
                                                    <span className="message-text">{body}</span>
                                                </p>
                                            )
                                        }
                                        else {
                                            return (
                                                <p className="App-message" style={{ textAlign: "right" }} key={i}>
                                                    <span className="message-sender">You</span>
                                                    <br />
                                                    <span className="message-text">{body}</span>
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
                    onCreate={async ({ name }) => {
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                        const temp = await startChat({
                            variables: {
                                name1: me,
                                name2: name
                            }
                        })
                        setMessages(temp.data.createChatBox.messages);
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
                onSearch={async (msg) => {
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
                    const temp = await sendMessage({
                        variables: {
                            name1: me,
                            name2: activeKey,
                            body: msg
                        }
                    });
                    setMessages(temp.data.createMessage.messages);
                    setMessageInput("");
                }}

            ></Input.Search>
        </>);
};
export default ChatRoom;

