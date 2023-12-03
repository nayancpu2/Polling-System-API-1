const mongoose = require('mongoose')
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    link_to_vote: {
        type: String
    }
})
const Option = mongoose.model('Option', optionSchema);
module.exports = Option;