const Option = require('../models/options');
const Question = require('../models/questions');
module.exports.create = async function (req, res) {
    try {
        const id = req.params.id;
        const { text, votes } = req.body;
        if (!id || !text) {
            return res.status(404).json({
                message: 'Please Check the provided details',
            });
        }
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({
                message: 'Invalid Question id'
            });
        }
        const option = await Option.create({ 'text': text, 'question_id': question._id });
        option.votes = votes;
        option.link_to_vote = `http://localhost:8000/options/${option.id}/add_vote`;
        await option.save();

        if (!option) {
            throw new Error('unable to create option');
        }
        question.options.push(option._id);
        await question.save()
        return res.status(200).send(option);

    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


module.exports.add_vote = async function (req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({
                message: 'Option not exist'
            });
        };
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({
                message: 'Option id is not valid',
            });
        };
        option.votes = +1;
        await option.save();

        return res.status(200).send(option)

    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


module.exports.delete = async function (req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                message: 'Empty option id recieved'
            });
        };
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({
                message: 'Option id is not valid'
            });
        };
        if (option.votes == 0) {
            await Question.findByIdAndUpdate(option.question_id, { $pull: { 'options': option.id } });
            await Option.findByIdAndDelete(id);

            return res.status(200).json({
                message: 'Option deleted sucessfully'
            });
        } else {
            return res.status(400).json({
                message: "Option has votes"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}