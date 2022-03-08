import {dbConnect} from "../../../server/config/db-connect"
import Posts from "../../../server/models/posts"
import User from "../../../server/models/user"
export const config={
  api:{
    bodyParser:false
  }
}

export default async function handler(req,res){
  try{
    const {postId}=req.query
    const relatedPostLimit=req.headers.relatedpostlimit||10
    await dbConnect()
    var currPost=await Posts.findById(postId)
    if(!currPost) return res.status(501)
    .json({status:false,message:"post not found"})

    currPost=await User.populate(currPost,{
      path:"user",
      select:"name _id email"
    })

    var relatedCategoryPost=await
    Posts.find({$and:[{_id:{$ne:currPost._id}},{category:currPost.category}]}).limit(relatedPostLimit)
    relatedCategoryPost=await User.populate(relatedCategoryPost,{
      path:"user",
      select:"name _id email"
    })


    return res.status(201).json({status:true,currPost,relatedCategoryPost})

  }catch(err){
    console.log(err)
  }



}
