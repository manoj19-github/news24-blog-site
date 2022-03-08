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
    await dbConnect()
    const skip=+req.headers?.nextpagetoken ||0
    const nextPageToken=parseInt(skip)+10
    var allPosts=await Posts.find({}).skip(skip).limit(10)
    allPosts=await User.populate(allPosts,{
      path:"user",
      select:"name _id email"
    })

    if(!allPosts.length){
       return res.status(201).
      json({status:true,nextPageToken,completed:true})
    }
    return res.status(201).
    json({status:true,allPosts,nextPageToken,completed:false})
  }catch(err){
    console.log("something went wrong",err)
    return res.status(501).
    json({status:false,message:"something went wrong"})
  }
}
