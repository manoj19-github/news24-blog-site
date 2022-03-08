import {categoryPostTypes} from "../../redux/types"
const initState={
  loading:false,
  error:null,
  categoryData:[],
  nextpagetoken:0
}
export const categoryPostsReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case categoryPostTypes.CATEGORY_POSTS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case categoryPostTypes.CATEGORY_POSTS_ERROR:
      return {
        ...state,
        loading:false,
        error:payload
      }
    case categoryPostTypes.CATEGORY_POSTS_SUCCESS:
      return{
        ...state,
        loading:false,
        categoryData:payload.categoryData,
        nextpagetoken:payload.nextpagetoken
      }
      case categoryPostTypes.ADD_MORE_POSTS:
      if(payload.categoryData.length){
        return {
          ...state,
          loading:false,
          categoryData:state.categoryData.length?[...state.categoryData,...payload.categoryData]:payload.categoryData,
          nextpagetoken:payload.nextpagetoken
        }
      }
      return {
        ...state,
        loading:false,
        categoryData:payload.categoryData,
        nextpagetoken:payload.nextpagetoken
      }

    default:return state
  }
}
