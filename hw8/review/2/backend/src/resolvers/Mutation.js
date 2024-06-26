const Mutation = {
  async createChatBox(parent, name1, name2, { db, pubsub }, info) {
    if (!name1 || !name2)
      throw new Error ("Missing chatBox name for CreateChatBox");
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    return chatBox;
  },
  async createMessage(parent, key, body, { db, pubsub }, info) {
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    return Message;
  },
};

export default Mutation;
