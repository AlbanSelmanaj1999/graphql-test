const mongoose=require('mongoose');

const Student=mongoose.model("Student",{
    firstname:String,
    lastname:String,
    age:Number
})

module.exports={Student};