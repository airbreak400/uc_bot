import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    chatId: { type: String, required: true },
    users: [{
        userFullName: { type: String, required: true },
        userId: { type: String, required: true }, 
        dickSize: { type: Number, required: true, default: 0 }, 
        lastCheck: { type: Date, required: true, default: new Date()},
    }]
})

export default mongoose.model('Chat', ChatSchema);