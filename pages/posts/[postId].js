import React from 'react'
import {useRouter } from "next/router"
import SinglyPost from "../../components/post/SinglyPost"
import Layout from "../../components/Layout"
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "../../components/post"
const PostPage = ({postData}) => {

  const router=useRouter()
  const {postId}=router.query


    return (

          <div className=" flex flex-col lg:flex-row   min-h-[100vh] mx-auto">
            <div className="w-full lg:w-[75%] min-h-[100vh] ">
              {postData.status ?<SinglyPost postData={postData.currPost}

                />:
                <h2 className="text-center text-gray-500">Post Not Found</h2>
              }
            </div>
            <div className="w-full lg:w-[24%] mt-12 lg:mt-0 min-h-[100vh]  ml-auto">
              {postData.relatedCategoryPost?.map((data,index)=>(
                <Post key={index} postData={data} relatedPost />
              ))}
            </div>
          </div>

    )
}

export default PostPage
export async function getStaticPaths(){
  const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`)
  const resp=await aresp.json()

  const paths=resp.allPosts.map(data=>{
    return {
      params:{
        postId:`${data._id}`
      }
    }
  })


  return{
    paths,
    fallback:"blocking"
  }


}
export async function getStaticProps(context){
  const {params}=context
  try{
    const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${params.postId}`)
    const resp=await aresp.json()


    return {
      props:{
        postData:resp
      }
    }



  }catch(err){
    console.log(err)
  }
}
