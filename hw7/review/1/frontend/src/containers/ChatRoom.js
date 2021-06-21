import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
let count=0
const { TabPane } = Tabs;
const formatTextWrap = (text, maxLineLength) => {
    var words = text.replace(/[\r\n]+/g, ' ').split(' ')
    var lineLength = 0
    var output = ''
    for (var word of words) {
      if (lineLength + word.length >= maxLineLength) {
        output += `                \n${word} `
        lineLength = word.length + 1
      } else {
        output += `${word} `
        lineLength += word.length + 1
      }
    }
    return output
}

const ChatRoom = ({ me , displayStatus}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const addChatBox = ()=>{setModalVisible(true)};
    const {chatBoxes, createChatBox, removeChatBox, setChatBoxes} = useChatBox();
    const {status, sendMessage, getChat, deleteBox} = useChat();
    const [lastTabs, setlastTabs]= useState([]);

    useEffect(() => {
        if(status.type == "CHAT"){
            // setchatBoxes()
            // console.log(status.data);
            setChatBoxes(chatBoxes.map((n)=>{
                if(n.key== activeKey){
                    let a = n
                    a.chatLog = status.data.messages;
                    // console.log(a);
                    return a;
                }else{
                    return n;
                }
            }))
        }else if(status.type == "MESSAGE"){
            setChatBoxes(chatBoxes.map((n)=>{
                if(n.key== activeKey){
                    let a = n
                    a.chatLog = [...a.chatLog, status.data.message];
                    // console.log(a);
                    return a;
                }else{
                    return n;
                }
            }))
        }else if(status.type=="BOX"){
            setlastTabs(status.data.friends);
        }
    }, [status])

    useEffect(() => {
        // console.log("update chatBoxes");
        // console.log(status);
        // console.log(chatBoxes);
        if(lastTabs.length>0){
            setlastTabs(lastTabs.filter((n, i)=>(i !== 0)));
        }
    }, [chatBoxes])

    useEffect(() => {
        // console.log(lastTabs[0]);
        if(lastTabs.length>0){
            const key = createChatBox(lastTabs[0], me);
            setActiveKey(key);
            getChat(key, me);
        }
    }, [lastTabs])


    return (
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => {
                        getChat(key, me);
                        setActiveKey(key);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove"){
                            const key = removeChatBox(targetKey, activeKey)
                            deleteBox(targetKey,key, me);
                            if(key!="")
                                getChat(key, me);
                            setActiveKey(key);
                        }
                    }}>
                    {chatBoxes.map(({ friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                {chatLog.map((n)=>{
                                    let text = formatTextWrap(n.body, 70)
                                    return(
                                        (n.name!=me)?
                                        <p className= "message-left">
                                            <Tag color="geekblue">{n.name}</Tag>
                                            {text}
                                        </p>:
                                        <p className="message-right">
                                            {text}&ensp;
                                            <Tag color={(n.name==me)? "orange":"blue"}>{n.name}</Tag>
                                        </p>
                                    )
                                })}
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({name}) => {
                        const key = createChatBox(name, me);
                        setActiveKey(key);
                        getChat(key, me);
                        setModalVisible(false);
                    }}
                    onCancel={() => { setModalVisible(false);}}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={e =>setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
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
                    sendMessage({ key: activeKey, body: msg }, me);
                    setMessageInput("");
                }} >   
            </Input.Search>
        </>
    );
};

export default ChatRoom;
                         