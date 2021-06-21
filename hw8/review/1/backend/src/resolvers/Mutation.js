const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const validateUser = async (db, name) => {
  const existing = await db.UserModel.findOne({ name });
  if (existing){
    console.log("User exists for createChatBox: " + name);
    return existing;
  }
  console.log("User does not exist for createChatBox: " + name);
  return new db.UserModel({ name }).save();
};

const validateChatBox = async (db, name) => {
  let box = await db.ChatBoxModel.findOne({ name });
  if (!box) box = await new db.ChatBoxModel({ name }).save();
  return box
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

const Mutation = {
  async createChatBox(parenet, { name1, name2 }, { db, pubsub }, info){
    console.log(`Create ChatBox ${makeName(name1, name2)}`);
    if(!name1 || !name2)
      throw new Error("Missing chatBox name for createChatBox");
    await validateUser(db, name1);
    await validateUser(db, name2);
    const chatBoxName = makeName(name1, name2);
    const chatBox = await validateChatBox(db, chatBoxName);

    return chatBox;
  },

  async createMessage(parenet, { sender, reciever, body }, { db, pubsub }, info){
    console.log(`Create Message ${body} from ${sender} to ${reciever}`);
    const senderObj = await validateUser(db, sender);
    const recieverObj = await validateUser(db, reciever);
    const chatBoxName = makeName(sender, reciever);
    const chatBox = await validateChatBox(db, chatBoxName);
    
    const newMessage = new db.MessageModel({ sender: senderObj, body: body });
    await newMessage.save();

    chatBox.messages.push(newMessage);
    await chatBox.save();
    
    pubsub.publish(`chatBox ${chatBoxName}`, {
      chatBox: {
        mutation: 'UPDATE',
        data: newMessage,
      }
    });

    return newMessage;
  }
}

export { Mutation as default };
