import {useEffect} from "react"
import Head from 'next/head'
import Image from 'next/image'
import Post from "../components/post"
import Link from "next/link"
import Layout from "../components/Layout"
import {allPostsTypes} from "../redux/types"
import InfiniteScroll from "react-infinite-scroll-component"
import {useDispatch,useSelector} from "react-redux"
import {allPostsAction} from "../redux/actions/allPosts.action"
export default function Home({allPosts}) {
  const dispatch=useDispatch()


  useEffect(()=>{
    dispatch({type:allPostsTypes.ALL_POSTS_SUCCESS,payload:{allPosts,nextpagetoken:allPosts.length}})
  },[dispatch,allPosts])
  const Posts= useSelector(state=>state.allPostsReducer.allPosts)
  const fetchFile=(e)=>{
    console.log(e.target.files)

  }
  const fetchData=()=>{
    dispatch(allPostsAction())
  }
  return (
      <InfiniteScroll
        dataLength={Posts?.length}
        hasMore={true}
        next={fetchData}
        endMessage={`No news remain`}
        className=""
      >
        {
          Posts?.map((data,index)=>(
            <Post key={data._id} postData={data}/>
          ))
        }
      </InfiniteScroll>
  )
}
export async function getStaticProps(){
  try{
    const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`)
    const resp=await aresp.json()
    if(resp.status){
      return{
        props:{
          allPosts:resp.allPosts
        },
        revalidate:1000
      }

    }else{
      return{
        props:{
          allPosts:[]
        },
        revalidate:1000

      }

    }


  }catch(err){
    console.log(err)

  }
}
