import {dbConnect} from "../../../../server/config/db-connect"
import Posts from "../../../../server/models/posts"
import User from "../../../../server/models/user"
import {requireSignin} from "../../../../server/middleware/requireSignin"

export const config={
  api:{
    bodyParser:false
  }
}

export default async function(req,res){
  try{
    await dbConnect()
    if(!await requireSignin(req)){
      return res.status(501).json({
        status:false,
        message:"unauthorized user access denied"
      })
    }
    var myposts=await Posts.find({user:req.user._id})
    const myDetails=await User.findById(req.user._id)
    myposts=await User.populate(myposts,{
      path:"user",
      select:"name _id email"
    })
    return res.status(201).json({
      status:true,
      isMyPosts:true,
      myposts,
      myDetails

    })
  }catch(err){
    console.log(err)
    return res.status(501).json({
      status:false,
      message:"something went wrong"
    })
  }

}
