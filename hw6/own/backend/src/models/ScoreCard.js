// Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    subject: {
        type: String,
        required: [true, 'Subject field is required.']
    },
    score: {
        type: Number,
        required: [true, 'Score field is required.']
    }
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

export default ScoreCard;