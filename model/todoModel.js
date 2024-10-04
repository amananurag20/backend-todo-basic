const mongoose= require("mongoose");

const todoSchema= mongoose.Schema({
    title:String,
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean
    }
});

const Todo= mongoose.model("Todo", todoSchema);//todos

module.exports= Todo;