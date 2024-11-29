import mongoose from "mongoose";

const userschema=mongoose.Schema({
    email:{type:String,require:true},
    name:{type:String},
    desc:{type:String},
    joinedon:{type:Date,default:Date.now},
    ispremium: { type: Boolean, default: false },
})

export default mongoose.model("User",userschema)