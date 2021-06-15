const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const validateUser = async (db, name) => {
    const existing = await db.UserModel.findOne({ name });
    if (existing)
        return existing;
    return new db.UserModel({ name }).save();
};

const validateChatBox = async (db, name) => {
    let box = await db.ChatBoxModel.findOne({ name });
    if (!box)
        box = await new db.ChatBoxModel({ name }).save();
    return box
        .populate('users')
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
};

const Mutation = {
    async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
        if (!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");

        const chatBoxName = makeName(name1, name2);
        await validateUser(db, name1);
        await validateUser(db, name2);
        const chatBox = await validateChatBox(db, chatBoxName);

        pubsub.publish(`comment ${chatBoxName}`, {
            comment: {
                mutation: 'CREATED',
                data: chatBox,
            },
        });

        return chatBox;
    },
    async createMessage(parent, { name1, name2, body }, { db, pubsub }, info) {
        if (!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if (!body)
            throw new Error("No message body");

        const chatBoxName = makeName(name1, name2);
        const sender = await validateUser(db, name1);
        await validateUser(db, name2);
        const chatBox = await validateChatBox(db, chatBoxName);

        const newMessage = new db.MessageModel({ sender, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();

        pubsub.publish(`comment ${chatBoxName}`, {
            comment: {
                mutation: 'CREATED',
                data: chatBox,
            },
        });

        return chatBox;
    }
};

export default Mutation;
