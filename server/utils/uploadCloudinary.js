import cloudinary from "cloudinary"
const uploadCloudinary=async(filePath)=>{
  var uploadedFile
  try{
    uploadedFile=await cloudinary.v2
    .uploader.upload(filePath,{
      folder:"pizzahut2",
      resource_type:"auto"
    })
    const {secure_url}=uploadedFile
    return secure_url
    
  }catch(err){
    console.log(`cloudinary uploading error in uploadcloudinary`,err)
    return null
  }
}
export default uploadCloudinary
