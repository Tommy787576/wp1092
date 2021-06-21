import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const sendMessage = (msg) => { 
    console.log(msg); 
  }
  return {
    status,
    messages,
    sendMessage
  };
};

export default useChat;
