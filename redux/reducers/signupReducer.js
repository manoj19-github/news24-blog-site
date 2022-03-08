import {signupTypes} from "../types"

const initState={
  loading:false,
  status:null
}
export const signupReducer=(state=initState,action)=>{
  const {type}=action
  switch(type){
    case signupTypes.SIGNUP_REQUEST:
      return{
        ...state,
        loading:true
      }
    case signupTypes.SIGNUP_SUCCESS:
      return{
        loading:false,
        status:true
      }
    case signupTypes.SIGNUP_FAIL:
      return{
        loading:false,
        status:false
      }
    default:return state

  }

}
