import { useState } from "react";  

const server = new WebSocket('ws://localhost:8080');
// server.onopen = () => console.log('Server connected.');
server.sendEvent = (e) => server.send(JSON.stringify(e));

const getReceiver = (users, sender) => {
  let u = users.split('_');
  return u[0] === sender ? u[1] : u[0];
}

const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendMessage = (payload) => {
    // console.log(payload);
    if (!payload.key || !payload.sender || !payload.body) {
      throw new Error('Empty input!');
    }

    const receiver = getReceiver(payload.key, payload.sender);
    // console.log(`receiver: ${receiver}`);

    server.sendEvent({
      type: 'MESSAGE',
      data: { to: receiver, name: payload.sender, body: payload.body },
    });
  }; // { key, msg }
  return { status, sendMessage };
};
export default useChat;
