import request from "../request"
import Swal from "sweetalert2"
import {signupTypes} from "../types"
export const signupAction=(authData)=>async dispatch=>{
  const {email,password,name}=authData
  try{
    dispatch({type:signupTypes.SIGNUP_REQUEST})
    const {data}=await request.post("/signup",{email,password,name})
    dispatch({type:signupTypes.SIGNUP_REQUEST})

    if(data.status){
      Swal.fire({
        icon: 'Success',
        title: 'Success',
        text: 'signup completed',
      })
      return true
    }
  }catch(err){
    dispatch({type:signupTypes.SIGNUP_FAIL})
    console.log(err)
    Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!',
    })
    return false
  }

}
