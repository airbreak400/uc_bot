import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DirectSchema = new Schema({
    userId: { type: String, required: true }
})

export default mongoose.model('Direct', DirectSchema);