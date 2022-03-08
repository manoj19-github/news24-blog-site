import {myPostType} from "../types"
const getSessionData=()=>{
  if(typeof window !=="undefined"){
    JSON.parse(sessionStorage.getItem("news24-mypostData"))?.myPosts
  }
}
const initState={
  error:null,
  loading:false,
  myPostData:getSessionData()?getSessionData():[]
}
export const myPostReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case myPostType.MY_POSTS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case myPostType.MY_POSTS_SUCCESS:
      return{
        ...state,
        loading:false,
        myPostData:payload
      }
    case myPostType.MY_POSTS_ERROR:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case myPostType.ADD_NEW_POST:
    if(state.myPostData.length){
      sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[payload,...state.myPostData]}))
      return {
        ...state,
        myPostData:[payload,...state.myPostData]
      }
    }else{
      sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[payload]}))
        return {
          ...state,
          myPostData:[payload]
        }

    }

    case myPostType.EDIT_MY_POST:
      if(state.myPostData.length){
        const existingPost=state.myPostData.filter(data=>data._id!=payload._id)
        sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[...existingPost,payload]}))
        return {
          ...state,
          myPostData:[...existingPost,payload]
        }
      }else{
        sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[payload]}))
          return {
            ...state,
            myPostData:[payload]
          }
        }
    case myPostType.DELETE_MY_POST:
          if(state.myPostData.length){

            const existingPost=state.myPostData.filter(data=>data._id!=payload._id)
            sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[...existingPost,payload]}))
            return {
              ...state,
              myPostData:existingPost
            }
          }else{
              sessionStorage.setItem("news24-mypostData",JSON.stringify({myPosts:[]}))
              return {
                ...state,
                myPostData:[]
              }

          }

    default:return state
  }
}
