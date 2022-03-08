import request from "../request"
import {authorsPostTypes,myPostType} from "../types"
import Swal from "sweetalert2"
import axios from "axios"
export const authorPostsAction=(authorId)=>async(dispatch,getState)=>{
  try{
    dispatch({type:categoryPostTypes.AUTHOR_POSTS_REQUEST})
    const {data}=await request(`/posts/category/author/${authorId}`,{
      headers:{
        nextpagetoken:getState().authorPostReducer.nextpagetoken
      }
    })
    console.log("category action : ",data)
    dispatch({type:authorsPostTypes.ADD_MORE_POSTS,
      payload:{allPosts:data.allPosts,nextpagetoken:data.nextPageToken}})

  }catch(err){
    console.log(`error occured : `,err)
    dispatch({type:authorsPostTypes.AUTHOR_POSTS_ERROR,payload:err})
  }
}

export const updateAction=(postId,myTitle,myCategory,desc,imageData,isImageChange,router)=>async (dispatch,getState)=>{
  try{
    const formData=new FormData()
    dispatch({type:myPostType.MY_POSTS_REQUEST})
    formData.append("image",imageData)
    formData.append("postId",postId)
    formData.append("title",myTitle)
    formData.append("desc",desc)
    formData.append("isImageChange",isImageChange)
    formData.append("category",myCategory)

    const {data}=await axios({
      method:"post",
      data:formData,
      url:`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/myposts/updatePost`,
      headers:{
        "Content-Type":"multipart/form-data",
        authorization:`Bearer ${getState().loginReducer.userToken || ""}`,
      },
    })

    if(data.status){
      dispatch({type:myPostType.EDIT_MY_POST,payload:data.posts})
      router.push(`/posts/myPosts`)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }catch(err){
    console.log(err)
  }
}

export const insertAction=(myTitle,myCategory,desc,imageData,router)=>async (dispatch,getState)=>{
  try{
    const insertFormData=new FormData()
    dispatch({type:myPostType.MY_POSTS_REQUEST})
    insertFormData.append("image",imageData)
    insertFormData.append("title",myTitle)
    insertFormData.append("desc",desc)
    insertFormData.append("category",myCategory)

    const {data}=await axios({
      method:"post",
      data:insertFormData,
      url:`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/create`,
      headers:{
        "Content-Type":"multipart/form-data",
        authorization:`Bearer ${getState().loginReducer.userToken || ""}`,
      },
    })

    if(data.status){
      dispatch({type:myPostType.ADD_NEW_POST,payload:data.posts})
      router.push(`/posts/myPosts`)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }catch(err){
    console.log(err)
  }
}

export const deleteAction=(postId,router)=>async (dispatch,getState)=>{
  try{
    const {data}=await request.post("/posts/myposts/delposts",{postId},{
      headers:{
        authorization:`Bearer ${getState().loginReducer.userToken || ""}`,
      },
    })
    if(data.status){
      dispatch({type:myPostType.DELETE_MY_POST,payload:data.posts})
      router.push(`/posts/myPosts`)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }catch(err){
    console.log(err)
  }
}
