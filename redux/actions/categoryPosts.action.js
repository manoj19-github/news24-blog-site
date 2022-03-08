import request from "../request"
import {categoryPostTypes} from "../types"

export const categoryPostsAction=(categoryName)=>async(dispatch,getState)=>{
  try{
    dispatch({type:categoryPostTypes.CATEGORY_POSTS_REQUEST})
    const {data}=await request(`/posts/category/${categoryName}`,{
      headers:{
        nextpagetoken:getState().categoryPostsReducer.nextpagetoken
      }
    })
    console.log("category action : ",data)
    dispatch({type:categoryPostTypes.ADD_MORE_POSTS,
      payload:{categoryData:data.allPosts,nextpagetoken:data.nextPageToken}})

  }catch(err){
    console.log(`error occured : `,err)
    dispatch({type:categoryPostTypes.CATEGORY_POSTS_ERROR,payload:err})
  }
}
