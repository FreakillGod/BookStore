const mongoose= require('mongoose')

const bookSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide book name"],
        maxlength:[25,"character length exceeded"]
    },
    description:{
        type:String,
        required:[true,'please provide book description'],
        maxlength:[70,"charcter length exceeded"]
    },
    price:{
        type:Number,
        required:[true,"please provide book price"],
        min:1,
        max:10000,
    },
    author:{
        type:String,
        required:[true,'please provide author name'],
    },
    genre:{
        type:String,
        required:[true,'genre must br provided']
    }
    ,
    // genre:[{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    createdAt:{
        type: Date,
        default: Date.now(),
    }
})


module.exports=mongoose.model('Books',bookSchema);