import React,{useEffect} from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "../../components/post"
import {useDispatch,useSelector} from "react-redux"
import {categoryPostTypes} from "../../redux/types"
import {categoryPostsAction} from "../../redux/actions/categoryPosts.action"
import {useRouter} from "next/router"
const Category = ({categoryData}) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const {categoryName}=router.query
  const categoryPostsData=useSelector(state=>state.categoryPostsReducer.categoryData)
  useEffect(()=>{
      dispatch({type:categoryPostTypes.CATEGORY_POSTS_SUCCESS,
        payload:{categoryData:categoryData.allPosts,
          nextpagetoken:categoryData.nextPageToken}})
  },[dispatch,categoryName])

  const fetchData=()=>{
    dispatch(categoryPostsAction(categoryName))
  }

  return (
    <>
    <h2 className="ml-0 lg:ml-8 pl-0 lg:pl-6 text-xl mb-6 border-b border-blue-500 text-gray-500 uppercase">{categoryName} News</h2>
  {
    categoryPostsData ?

      <InfiniteScroll
        dataLength={categoryPostsData?.length}
        hasMore={true}
        next={fetchData}
        endMessage={`No news remain`}
        className=""
      >
        {
         categoryPostsData?.map((data,index)=>(
            <Post key={data._id} postData={data}/>
          ))
        }
      </InfiniteScroll>
      :<h1 className="text-center text-gray-500 text-2xl mt-5">No Posts To Show</h1>
    }
      </>
  )
}

export default Category
export async function getStaticPaths(){
  return{
    paths:[

        {params:{categoryName:"political"},},
        {params:{categoryName:"entartainment"},},
        {params:{categoryName:"international"},},
        {params:{categoryName:"business"},},
        {params:{categoryName:"sports"},},
        {params:{categoryName:"educational"},},
        {params:{categoryName:"others"},}
    ],
    fallback:false
  }
}
export async function getStaticProps(context){

  try{
    const {params}=context
    const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/category/${params.categoryName}`)
    const resp=await aresp.json()
    return {
      props:{
        categoryData:resp
      },
      revalidate:1000
    }
  }catch(err){
    console.log(err)
  }

}
