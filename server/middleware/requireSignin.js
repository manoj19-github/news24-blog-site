import User from "../models/user"
import jwt from "jsonwebtoken"

export const requireSignin=async(req)=>{

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
      const userToken=req.headers.authorization.split(" ")[1]
      if(userToken){
        const decoded=jwt.verify(userToken,process.env.NEXT_PUBLIC_JWT_SECRET)
        req.user=await User.findById(decoded.id).select("-password")
        return true
      }else{
        return false
      }
    }catch(err){
      return false
    }
  }
}
