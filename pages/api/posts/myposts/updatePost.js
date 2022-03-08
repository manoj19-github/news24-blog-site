import {dbConnect} from "../../../../server/config/db-connect"
import Posts from "../../../../server/models/posts"
import User from "../../../../server/models/user"
import nc from "next-connect"
import multer from "multer"
import initCloudinary from "../../../../server/config/cloudinary-config"
import uploadCloudinary from "../../../../server/utils/uploadCloudinary"
import {requireSignin} from "../../../../server/middleware/requireSignin"

export const config={
  api:{
    bodyParser:false
  }
}

const storage=multer.diskStorage({})
const uploads=multer({storage})

const handler=nc({
  onError:(err,req,res,next)=>{
    console.log(`error occured`)
    return res.status(500).json({status:false,message:"something went wrong"})
  },
  onNoMatch:(req,res,next)=>{
    return res.status(404).json({
      status:false,message:"Not Found"
    })
  }
}).use(uploads.single("image"))
.post(async(req,res)=>{
  try{
    await dbConnect()
    await initCloudinary()
    if(!await requireSignin(req)){
      return res.status(501).json({status:false,message:"access denied"})
    }
    const {title,desc,category,postId,isImageChange}=req.body
    var uImageUrl=""
    if(parseInt(isImageChange)){
      uImageUrl=await uploadCloudinary(req.file.path)
    }
    var updatedPost
    if(uImageUrl!=""){
      updatedPost=await Posts.findOneAndUpdate(
        {$and:[{_id:postId},{user:req.user._id}]},
        {$set:{title,desc,category,image:uImageUrl}},
        {new:true}
      )
      updatedPost=await User.populate(updatedPost,{
        path:"user",
        select:"name _id email"
      })
      return res.status(201).json({
        status:true,
        posts:updatedPost
      })

    }else{
      updatedPost=await Posts.findOneAndUpdate(
        {$and:[{_id:postId},{user:req.user._id}]},
        {$set:{title,desc,category}},
        {new:true}
      )
      updatedPost=await User.populate(updatedPost,{
        path:"user",
        select:"name _id email"
      })
      return res.status(201).json({
        status:true,
        posts:updatedPost
      })
    }
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status:false,
      message:"please fill all the field correctly"
    })
  }
})
export default handler
