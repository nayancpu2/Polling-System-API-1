const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tspeed848:nayandeb@cluster0.n9uxjng.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', ()=>{
    console.log('Data Base is connected successfully');
});

module.exports = mongoose;