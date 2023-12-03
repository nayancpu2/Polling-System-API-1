
const express = require('express')
const questionController = require('../controller/Questions.Controller')
const Router = express.Router()

Router.post('/create',questionController.create)
Router.get('/:id',questionController.showDetails)
Router.delete('/:id/delete',questionController.deleteQues)
Router.use('/options',require('./option.routes'))

module.exports=Router