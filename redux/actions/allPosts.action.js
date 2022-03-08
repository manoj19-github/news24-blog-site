import request from "../request"
import {allPostsTypes} from "../types"

export const allPostsAction=()=>async(dispatch,getState)=>{
  try{
    dispatch({type:allPostsTypes.ALL_POSTS_REQUEST})
    const {data}=await request("/posts",{
      headers:{
        nextpagetoken:getState().allPostsReducer.nextpagetoken  
      }
    })
    dispatch({type:allPostsTypes.ADD_MORE_POSTS,
      payload:{allPosts:data.allPosts,nextpagetoken:data.nextPageToken}})

  }catch(err){
    console.log(`error occured : `,err)
    dispatch({type:allPostsTypes.ALL_POSTS_ERROR,payload:err})
  }
}
