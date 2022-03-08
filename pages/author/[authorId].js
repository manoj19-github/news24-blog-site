import React,{useEffect} from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "../../components/post"
import {useDispatch,useSelector} from "react-redux"
import {authorsPostTypes} from "../../redux/types"
import {authorPostsAction} from "../../redux/actions/authorPosts.action"
import {useRouter} from "next/router"
const AuthorsPost = ({authorData}) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const {authorId}=router.query

  const authorPostsData=useSelector(state=>state.authorPostReducer.allPosts)
  useEffect(()=>{
      dispatch({type:authorsPostTypes.AUTHOR_POSTS_SUCCESS,
        payload:{allPosts:authorData.allPosts,
          nextpagetoken:authorData.nextPageToken}})
  },[dispatch,authorId])

  const fetchData=()=>{
    dispatch(authorPostsAction(authorId))
  }
  return (
    <>
    <h2 className="ml-0 lg:ml-8 pl-0 lg:pl-6 text-xl mb-6 border-b border-blue-500 text-gray-500 uppercase">
      posted by {authorData.authorName}
    </h2>
  {
    authorPostsData ?

      <InfiniteScroll
        dataLength={authorPostsData?.length}
        hasMore={true}
        next={fetchData}
        endMessage={`No news remain`}
        className=""
      >
        {
         authorPostsData?.map((data,index)=>(
            <Post key={data._id} postData={data}/>
          ))
        }
      </InfiniteScroll>
      :<h1 className="text-center text-gray-500 text-2xl mt-5">No Posts To Show</h1>
    }
      </>
  )
}

export default AuthorsPost

export async function getServerSideProps(ctx){
  const authorId=ctx.params.authorId
  const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/category/author/${authorId}`)
  const resp=await aresp.json()
  return{
    props:{
      authorData:resp
    }
  }
}
