const Question = require('../models/questions')
const Option = require('../models/options')

module.exports.create = async function (req, res) {
    try {
        const { title } = req.body;
        const QuestionExist = await Question.findOne({ 'title': title });
        if (QuestionExist) {
            return res.status(401).json({
                message: "Question is already existed"
            });
        }
        const NewQuestion = Question.create({ 'title': 'title' });
        return res.status(200).send(NewQuestion);
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

module.exports.showDetails = async function (req, res) {
    try {
        const ques = await Question.findById(req.params.id).populate('options');
        if (ques) {
            res.send(ques);
        }
        else {
            res.send("id does not exits");
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


module.exports.deleteQues = async function (req, res) {
    try {

        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                message: 'Please Check The Id'
            });
        };
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({
                message: 'Question not found'
            });
        };
        await Option.deleteMany({ '_id': { $in: question.options } });
        await Question.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Quesion is deleted'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
}