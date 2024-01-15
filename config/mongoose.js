const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.PLACEMENT_CELL_REMOTE_dB}`);
// mongoose.connect(`mongodb://localhost:27017/${process.env.PLACEMENT_CELL_DB}`);
const db=mongoose.connection;
db.on('error', console.error.bind(console,'Error in connecting to the MongoDB'));
db.once('open',function(){
    console.log('Connected to the Database :: Mongo DB ');
})

module.exports=db;