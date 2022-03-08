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
    const {postId}=req.query
    await dbConnect()
    if(!await requireSignin(req)){
      return res.status(501).json({
        status:false,
        message:"unauthorized user"
      })

    }

    var mypost=await Posts.findOne({$and:[{user:req.user._id},{_id:postId}]})
    mypost=await User.populate(mypost,{
      path:"user",
      select:"name _id email"
    })
    return res.status(201)
      .json({
        status:true,
        isMyPosts:true,
        mypost
      })
  }catch(err){
    console.log(err)
    return res.status(501).json({
      status:false,
      message:"something went wrong"
    })
  }

}
