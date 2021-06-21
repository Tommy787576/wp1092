const Query = {
  async chatBox(parent, { name }, { db, pubsub }, info){
  let box = await db.ChatBoxModel.findOne({ name });
  if (!box){
    console.log(`chatBox ${name} does not exist`);
    box = await new db.ChatBoxModel({ name }).save();
  } 

  return box
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
  }
}

export { Query as default };
