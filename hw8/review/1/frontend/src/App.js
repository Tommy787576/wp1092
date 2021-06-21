import './App.css'
import SignIn from './containers/SignIn';
import ChatRoom from './containers/ChatRoom'
import useChat from './hooks/useChat'

import { useState, useEffect } from "react";
import { message } from 'antd';

const LOCALSTORAGE_KEY = "save-chatBoxes-hw8";

const App = () => {
  
  const savedChatBoxes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  const { status, messages, sendMessage } = useChat()
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedChatBoxes !== null ? savedChatBoxes.me : "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = { content: msg, duration: 1.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({me: me, chatBoxes: []}));
      document.title = me;
    }
  }, [signedIn]);

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    <div className="App">
      {signedIn? (<ChatRoom me={me} displayStatus={displayStatus}/>) : 
          (<SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>)}
    </div>
  );
};

export default App;
