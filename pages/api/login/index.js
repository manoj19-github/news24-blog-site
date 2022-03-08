import {dbConnect} from "../../../server/config/db-connect"
import User from "../../../server/models/user"
import jwt from "jsonwebtoken"

export default async function handler(req,res){
  try{
    if(req.method!=="POST"){
      return res.status(500)
      .json({status:false,message:'request method are wrong'})
    }
    const {email,password}=req.body

    if(!email || !password){
      return res.status(500).json({
        status:false,
        message:"please fill all the field"
      })
    }
    console.log(email,password)
    await dbConnect()
    const userExists=await User.findOne({email})
    if(userExists && await userExists.authenticate(password)){
      const userToken=jwt
      .sign({id:userExists._id},process.env.NEXT_PUBLIC_JWT_SECRET,{expiresIn:"1d"})

      return res.status(201).json({
        status:true,
        userToken,
        userData:{email:userExists.email,name:userExists.name,userId:userExists._id}
      })
    }else{
      return res.status(501).json({
        status:false,
        message:"password or email not valid"
      })
    }
  }catch(err){
    console.log(err)
    return res.status(501).json({
      status:false,
      message:"password or email not valid"
    })
  }
}
