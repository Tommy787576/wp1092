const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const Query = {
    hello() {
        return "Hello graphql";
    },
    async chatBoxQuery(parent, { name1, name2 }, { db }, info) {
        if (!name1 || !name2) {
            // console.log("Missing chatBox name for CreateChatBox");
            return;
        }
        // throw new Error("Missing chatBox name for CreateChatBox");

        const name = makeName(name1, name2);
        let box = await db.ChatBoxModel.findOne({ name });
        if (box)
            return box;
    }
}

export default Query;