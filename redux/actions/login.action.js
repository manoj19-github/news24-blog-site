import request from "../request"
import Swal from "sweetalert2"
import {loginTypes,logoutTypes} from "../types"
export const loginAction=(credential,router)=>async dispatch=>{
  try{
    const {email,password}=credential
    if(!email || !password) return alert("Please fill all field")
    dispatch({type:loginTypes.LOGIN_REQUEST})
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    const {data}=await request.post("/login",{email,password})
    dispatch({type:loginTypes.LOGIN_SUCCESS,payload:data.userData})
    dispatch({type:loginTypes.LOGIN_SUCCESS_GET_TOKEN,payload:data.userToken})

    document.cookie=`userToken=${data.userToken};expires=${1000*60*60*24}`
    sessionStorage.setItem("news24__userCredential",
    JSON.stringify({userToken:data.userToken,userCredential:data.userData}))
    router.push(`/posts/myPosts/${data.userData.userId}`)
  }catch(err){
    console.log(err)
    dispatch({type:loginTypes.LOGIN_FAIL})
    Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!'
    })
  }
}
export const logoutAction=()=>dispatch=>{
  dispatch({type:logoutTypes})
  document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  sessionStorage.removeItem("news24__userCredential")
}
