import {dbConnect} from "../../../server/config/db-connect"
import User from "../../../server/models/user"
import Posts from "../../../server/models/posts"
import nc from "next-connect"
import multer from "multer"
import initCloudinary from "../../../server/config/cloudinary-config"
import uploadCloudinary from "../../../server/utils/uploadCloudinary"
import {requireSignin} from "../../../server/middleware/requireSignin"

export const config={
  api:{
    bodyParser:false
  }
}

const storage=multer.diskStorage({})
const uploads=multer({storage})

const handler=nc({
  onError:(err,req,res,next)=>{
    console.log(`error occured`,err)
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
    const {title,desc,category}=req.body
    if(req.file==="undefined" || (!title || !desc || !category)){
      return res.status(500).json({
        status:false,
        message:"please fill all the field correctly"
      })
    }
    const imageUrl=await uploadCloudinary(req.file.path)
    const newPost=new Posts({
      title,
      desc,
      category,
      image:imageUrl,
      user:req.user._id
    })

    var savedPost=await newPost.save()
    savedPost=await User.populate(savedPost,{
      path:"user",
      select:"_id name email"
    })

    return res.status(201).json({
      status:true,
      posts:savedPost
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status:false,
      message:"please fill all the field correctly"
    })
  }
})
export default handler
