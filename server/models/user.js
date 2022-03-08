import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  }
},{timestamps:true})

userSchema.pre("save",async function(next){
  if(!this.isModified) next()
  this.name=this.name.toLowerCase()
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods={
  async authenticate(password){
    return await bcrypt.compare(password,this.password)
  }
}
mongoose.models = {};

export default mongoose.model('User', userSchema);
