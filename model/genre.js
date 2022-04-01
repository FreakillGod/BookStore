const mongoose = require('mongoose');

const genreSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'genre name is required']
    },
    counts:{
        type:Number,
        default:0,
    }
}) 

module.exports=mongoose.model('Genre',genreSchema);