import { useState } from "react";
import useChatBox from "../hooks/useChatBox";

const client = new WebSocket('ws://localhost:8080');

const useChat = () => {

    const [status, setStatus] = useState({}); // { type, msg }
    client.onmessage = (message)=>{
        // console.log("message from server!");
        let {data} = message;
        data = JSON.parse(data);
        // console.log(data);
        setStatus(data);
    }


    const sendData = async (data)=>{
        client.send(JSON.stringify(await data));
    }
    const sendMessage = (payload, me) => {
        const keys = payload.key.split("_");
        const receiver = (keys[0]==me)? keys[1]:keys[0]
        const data = {type: "MESSAGE", data:{name: me, to: receiver, body: payload.body}};
        // console.log("told server message sent");
        sendData(data);
        
    }; // { key, msg }

    const getChat = (payload, me) => {
        const keys = payload.split("_");
        const receiver = (keys[0]==me)? keys[1]:keys[0]
        const data = {type: "CHAT", data:{name: me, to: receiver}};
        sendData(data);
        
    }; // { key, msg }

    const getBoxes = (me) => {
        const data = {type: "BOX", data:{user: me}};
        sendData(data);    
    }; // { me }

    const deleteBox = (targetkey,activekey, me) => {
        const data = {type: "DELETE", data:{key: targetkey, newkey: activekey ,me: me}};
        sendData(data);    
    }; // { me }
    
    return { status, sendMessage, getChat, getBoxes, deleteBox};
};

export default useChat;