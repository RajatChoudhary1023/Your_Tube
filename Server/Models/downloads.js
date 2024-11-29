import mongoose from "mongoose"
const downloadvideoschema=mongoose.Schema({
    videoid:{type:String,require:true},
    viewer:{type:String,require:true},
    date:{type:Date,default:Date.now()}
})
export default mongoose.model("downloads",downloadvideoschema)