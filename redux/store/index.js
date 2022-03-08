import {
  createStore,applyMiddleware,
  combineReducers
} from "redux"
import thunk from "redux-thunk"
import {loginReducer} from "../reducers/loginReducer"
import {signupReducer} from "../reducers/signupReducer"
import {allPostsReducer} from "../reducers/allPostsReducer"
import {categoryPostsReducer} from "../reducers/categoryPostsReducer"
import {authorPostReducer} from "../reducers/authorPostReducer"
import {myPostReducer} from "../reducers/myPostReducer"
import {
  composeWithDevTools
} from "redux-devtools-extension"

// ///////////////////////////   reducer package  ///////////////////////////////
const rootReducers=combineReducers({
  loginReducer,signupReducer,
  allPostsReducer,categoryPostsReducer,
  authorPostReducer,myPostReducer
})

const store=createStore(rootReducers,{},composeWithDevTools(applyMiddleware(thunk)))
export default store
