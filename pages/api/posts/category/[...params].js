import {dbConnect} from "../../../../server/config/db-connect"
import Posts from "../../../../server/models/posts"
import User from "../../../../server/models/user"
export const config={
  api:{
    bodyParser:false
  }
}

export default async function handler(req,res){
  try{
    const {params}=req.query
    var allPosts,authorData
    const pageToken=+req.headers.nextpagetoken||0
    const nextPageToken=parseInt(pageToken)+10
    await dbConnect()
    if(params.length==1){
      allPosts=await Posts.find({category:params[0]}).skip(pageToken).limit(10)
    }else{
      allPosts=await Posts.find({user:params[1]}).skip(pageToken).limit(10)
      authorData=await User.findById(params[1])
    }

    if(!allPosts.length){
      return res.status(201).json({
        status:false,
        message:"its completed",
        completed:true
      })
    }

    allPosts=await User.populate(allPosts,{
      path:"user",
      select:"name _id email"
    })
    return res.status(201).json({
      status:true,
      allPosts,
      authorPosts:params.length==2,
      categoryPosts:params.length==1,
      nextPageToken,
      authorName:authorData?.name ?authorData.name :null
    })

  }catch(err){
    console.log(err)
    return res.status(501).json({
      status:false,
      message:"something went wrong"
    })


  }
}
