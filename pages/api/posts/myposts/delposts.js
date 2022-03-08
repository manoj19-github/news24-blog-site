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
    if(req.method!=="POST"){
      return res.status(501).json({status:false,message:"request method is wrong"})
    }
    const {postId}=req.body
    await dbConnect()
    await requireSignin(req)

    var myposts=await Posts.deleteOne({$and:[{user:req.user._id},{_id:postId}]})

    return res.status(201).json({
      status:true,
      isMyPosts:true,
      posts:myposts,
      message:"Posts Deleted"

    })
  }catch(err){
    return res.status(501).json({
      status:false,
      message:"something went wrong"
    })
  }

}
