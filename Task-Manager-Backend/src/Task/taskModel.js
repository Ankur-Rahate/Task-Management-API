import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
    trim:true,
    maxlength:100
  },
  description:{
    type:String,
    trim:true,
    maxlength:500,
  },
  status:{
    type:String,
    enum:["pending","completed"],
    default:"pending"
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require: true,
  }
},{
  timestamps: true
}
)

export default mongoose.model("Task", taskSchema)
