const express=require('express')
const optionsController=require('../controller/Options.Controller');
const Router=express.Router()

Router.post('/:id/create',optionsController.create);
Router.get('/:id/add_vote',optionsController.add_vote);
Router.delete('/:id/delete',optionsController.delete);

module.exports=Router;