import {dbConnect} from "../../../server/config/db-connect"
import User from "../../../server/models/user"
export default async function handler(req,res){
  try{
    if(req.method!=="POST"){
      return res.status(501)
      .json({status:false,message:"something went wrong"})
    }
    const {name,email,password}=req.body
    if(!name || !email||!password){
      return res.status(501).
      json({status:false,message:"something went wrong"})
    }
    await dbConnect()
    const newUser=new User({
      name,
      email,
      password
    })
    const saveUser=await newUser.save()
    if(saveUser){
      return res.status(201).json({
        status:true,
        message:"new User created successfully"
      })
    }
    return res.status(501).
    json({status:false,message:"something went wrong"})
  }catch(err){
    console.log(err)
    return res.status(501)
    .json({status:false,message:"something went wrong"})
  }
}
