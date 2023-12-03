const express=require('express')
const bodyParser=require('body-parser')
const db=require('./config/mongoose');
const app=express();
const Port=8000
app.use(bodyParser.urlencoded({extended:true}))
app.use('/questions',require('./routes/question.routes'));
app.use('/options',require('./routes/option.routes'))
app.listen(Port,()=>{
    console.log(`server is running on port: ${Port}`)
})