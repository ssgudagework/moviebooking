const mongoose = require('mongoose');

const mongourl = 'mongodb://localhost:27017'

const connectDB = ()=>{
    try{
        console.log("DB connected Sucessfully.")
        return mongoose.connect(mongourl)
    }catch(error){
        console.log('error');
        res.send(400).json({
            message: "Unable to connect DB"
        })
    }
}
module.exports = connectDB