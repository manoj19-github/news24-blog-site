import {allPostsTypes} from "../types"
const initState={
  loading:false,
  error:null,
  allPosts:[],
  nextpagetoken:0
}
export const allPostsReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case allPostsTypes.ALL_POSTS_REQUEST:
      return{
        ...state,
        loading:true,
      }
    case allPostsTypes.ALL_POSTS_SUCCESS:
      return{
        ...state,
        loading:false,
        allPosts:payload.allPosts,
        nextpagetoken:payload.nextpagetoken

      }
    case allPostsTypes.ADD_MORE_POSTS:
    if(payload.allPosts?.length){
      return {
        ...state,
        loading:false,
        allPosts:state.allPosts.length?[...state.allPosts,...payload.allPosts]:payload.allPosts,
        nextpagetoken:payload.nextpagetoken
      }
    }
    return {
      ...state,
      loading:false,
      nextpagetoken:payload.nextpagetoken
    }

    case allPostsTypes.ALL_POSTS_ERROR:
      return{
        ...state,
        loading:false,
        error:payload
      }
    default:return state
  }
}
