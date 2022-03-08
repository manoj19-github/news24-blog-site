import cloudinary from "cloudinary"
const initCloudinary=()=>{
  cloudinary.v2.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_API_CLOUD,
    api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret:process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  })
}
export default initCloudinary
