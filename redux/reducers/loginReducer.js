import {loginTypes,logoutTypes} from "../types"
const getSessionStroage=()=>{
  if(typeof window!="undefined"){
    return JSON.parse(sessionStorage.getItem("news24__userCredential"))
  }
}

const initState={
  loading:false,
  userToken:getSessionStroage()?getSessionStroage().userToken:null,
  authUser:getSessionStroage()?getSessionStroage().userCredential:null,
  error:null
}
export const loginReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case loginTypes.LOGIN_REQUEST:
      return{
        ...state,
        loading:true
      }
    case loginTypes.LOGIN_SUCCESS_GET_TOKEN:
      return{
        ...state,
        loading:false,
        userToken:payload
      }
    case loginTypes.LOGIN_SUCCESS:
      return{
        ...state,
        loading:false,
        authUser:payload
      }
    case loginTypes.LOGIN_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case logoutTypes:
      return {
        ...state,
        userToken:null,
        authUser:null
      }
    default:return state

  }

}
