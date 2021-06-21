import { useState } from "react"; 
const useChatBox = (prevChatBoxes) => {

  const [chatBoxes, setChatBoxes] = useState(prevChatBoxes);

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    newChatBoxes.push({ friend, key: newKey, unread:0});
    setChatBoxes(newChatBoxes);

    return newKey;
  };
  
  const removeChatBox = (activeKey, targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey)lastIndex = i - 1; 
    });
    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);

    return newActiveKey;
  };
  
  const setUnread = (key, count) => {
    let i = chatBoxes.findIndex((chatBox) => chatBox.key === key);
    if(i === -1) return;
    let newChatBoxes = [...chatBoxes];
    newChatBoxes[i].unread = count;
    setChatBoxes(newChatBoxes);
  }

  const updateUnread = (key, count) => {
    let i = chatBoxes.findIndex((chatBox) => chatBox.key === key);
    if(i === -1) return;
    let newChatBoxes = [...chatBoxes];
    newChatBoxes[i].unread += count;
    setChatBoxes(newChatBoxes);
  }

  return { chatBoxes, createChatBox, removeChatBox, updateUnread, setUnread };
};
export default useChatBox;
