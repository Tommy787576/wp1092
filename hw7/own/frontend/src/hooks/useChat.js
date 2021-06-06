import { useState } from "react";

const server = new WebSocket('ws://localhost:4000');

const useChat = (me) => {
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);

    server.onopen = () => console.log('Server connected.');
    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };
    server.sendEvent = (e) => server.send(JSON.stringify(e));

    const startChat = (key) => {
        if (key) {
            server.sendEvent({
                type: 'CHAT',
                data: { to: key, name: me },
            });
        }
    };

    const sendMessage = (payload) => {
        console.log(payload);
        server.sendEvent({
            type: 'MESSAGE',
            data: { to: payload.key, name: me, body: payload.body },
        });
    };

    const onEvent = (e) => {
        const { type } = e;

        switch (type) {
            case 'CHAT': {
                setMessages(() => e.data.messages);
                break;
            }
            case 'MESSAGE': {
                setMessages(() => [...messages, e.data.message])
                break;
            }
        }
    }

    return { status, sendMessage, startChat, messages };
};
export default useChat;