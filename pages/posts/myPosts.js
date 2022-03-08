import React,{useEffect} from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "../../components/post"
import {useDispatch,useSelector} from "react-redux"
import {categoryPostTypes} from "../../redux/types"
import {categoryPostsAction} from "../../redux/actions/categoryPosts.action"
import {useRouter} from "next/router"
import * as cookieParser from "cookie"
import {myPostType} from "../../redux/types"
const Category = ({myPostData}) => {

  const dispatch=useDispatch()
  useEffect(()=>{
      sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:myPostData.myposts}))
    dispatch({type:myPostType.MY_POSTS_SUCCESS,payload:myPostData.myposts})
  },[])
  const allMyPost=useSelector(state=>state.myPostReducer.myPostData)
  const router=useRouter()
  return (
    <>
    <div className="my-1 flex flex-col space-y-1">
      <p className="uppercase underline  font-bold text-gray-500 ml-0 lg:ml-5">{myPostData.myDetails?.name}</p>
      <p className="pb-2">{myPostData.myDetails?.email}</p>
    </div>
    {
     allMyPost?.map((data,index)=>(
        <Post key={data._id} postData={data} isMyPost/>
      ))
    }



      </>
  )
}

export default Category

export async function getServerSideProps(context){

  try{
    const {params}=context
    const cookies=context.req.headers.cookie || ""
    const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/myposts`,{
      headers:{
        authorization:`Bearer ${cookieParser.parse(cookies).userToken}`
      }
    })

    const resp=await aresp.json()

    return {
      props:{
        myPostData:resp
      }
    }
  }catch(err){
    console.log(err)
  }
}
