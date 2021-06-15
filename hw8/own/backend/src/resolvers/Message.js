const Message = {
    async sender(parent, args, { db }, info) {
        const senderName = await db.UserModel.findById(parent.sender);
        return senderName.name;
    },
};

export default Message;