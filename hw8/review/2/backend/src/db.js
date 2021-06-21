import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
});
  
const messageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
  
const UserModel = mongoose.model('users', userSchema);
const ChatBoxModel = mongoose.model('chatboxes', chatBoxSchema);
const MessageModel = mongoose.model('messages', messageSchema);

const db = {
    UserModel,
    ChatBoxModel, 
    MessageModel,
}

export default db;