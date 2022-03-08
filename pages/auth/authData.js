import {useState,useEffect} from 'react'
import {useRouter } from "next/router"
import Image from "next/image"
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch,useSelector} from "react-redux"
import {loginAction} from "../../redux/actions/login.action"
import {signupAction} from "../../redux/actions/signup.action"
const Signup = () => {

  const dispatch=useDispatch()
  const userToken=useSelector(state=>state.loginReducer.userToken)
  const loginLoader=useSelector(state=>state.loginReducer.loading)
  const signupLoader=useSelector(state=>state.signupReducer.loading)
  useEffect(()=>{
    if(userToken){
      router.push("/")
    }
  },[dispatch,userToken])

  const [isSignedUp,setIsSignedUp]=useState(true)

  const getLocalData=()=>{
    if(typeof window!=="undefined"){
      return JSON.parse(localStorage.getItem("news24-save-credential"))
    }
  }
  const [guestUser,setGuestUser]=useState({
    email:getLocalData()?.email,
    password:getLocalData()?.password
  })
  const router=useRouter()

  const initFormData=()=>{
    if(isSignedUp)
      return{
        email:"",
        password:"",
        isRemember:false
      }
      return{
        name:"",
        email:"",
        password:"",
        cPassword:""
      }
  }
  const validationSchemaSignedUp=Yup.object({
    name:Yup.string().trim().required("username is required"),
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),
    password:Yup.string().trim().min(4,"minimum 4 character required")
              .max(20,"must be less than 20 character")
              .required("password required"),
    cPassword:Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')

  })
  const validationSchemaLogin=Yup.object({
    email:Yup.string().trim().matches(/^[A-Za-z1-9_%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/i,"email not valid")
              .required("email is required"),
    password:Yup.string().trim().min(4,"minimum 4 character required")
              .max(20,"must be less than 20 character")
              .required("password required")
  })
  const submitHandlerLogin=async(values,onSubmitProps)=>{
    console.log("values.isRemember",values.isRemember)
    if(values.isRemember){
      localStorage.setItem("news24-save-credential",JSON.stringify({email:values.email,password:values.password}))
    }
    dispatch(loginAction(values,router))
  }
  const submitHandlerSignup=(values,onSubmitProps)=>{
    if(!dispatch(signupAction(values))){
      setIsSignedUp(false)
    }else{
      setIsSignedUp(true)
      onSubmitProps.resetForm()
    }
  }
  const handleSetGuestUser=()=>{
    setGuestUser({
      email:process.env.NEXT_PUBLIC_GUEST_USER_EMAIL,
      password:process.env.NEXT_PUBLIC_GUEST_USER_PASS
    })
  }

    return (
        <div className="w-full px-4 lg:px-12 mt-6">
          <div className="mt-2 h-[25vh] lg:h-[10vh] w-full lg:w-[50%] relative mx-auto">
            <Image
              src="/assets/site-logo.png"
              objectFit="fill"
              layout="fill"
            />
          </div>
          <div className="mt-12 w-full lg:w-[50%]  mx-auto mb-6">
            <Formik
              initialValues={guestUser|| initFormData}
              validationSchema={isSignedUp?validationSchemaLogin:validationSchemaSignedUp}
              onSubmit={isSignedUp ?submitHandlerLogin:submitHandlerSignup}
              enableReinitialize
            >
            {
              formik=>{
                console.log("formik",formik)
              return(
                <Form autoComplete={false}>
                {
                  !isSignedUp &&(
                    <div className="formdiv">
                      <label>
                        User Name
                      </label>
                      <Field name="name" type="text" className="field" />
                        <ErrorMessage name="name">
                          {
                            errors=>{
                              return <span style={{color:"red"}}>{errors}</span>
                            }
                          }
                        </ErrorMessage>
                    </div>

                  )
                }
                  <div className="formdiv">
                    <label>
                      Email
                    </label>
                    <Field name="email" type="email" className="field" />
                      <ErrorMessage name="email">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                  </div>
                  <div className="formdiv">
                    <label>
                      Password
                    </label>
                    <Field name="password" type="password" className="field" />
                      <ErrorMessage name="password">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                  </div>

                  {
                    !isSignedUp && (
                      <div className="formdiv">
                        <label>
                          Confirm PassWord
                        </label>
                        <Field name="cPassword" type="password" className="field" />
                          <ErrorMessage name="password">
                            {
                              errors=>{
                                return <span style={{color:"red"}}>{errors}</span>
                              }
                            }
                          </ErrorMessage>
                      </div>

                    )
                  }
                  {
                    isSignedUp && (
                      <div className="flex flex-row space-x-2 mt-4 items-center ">
                      <Field name="isRemember" type="checkbox" className="w-4 h-3 cursor-pointer"/>
                        <label htmlFor="isRemember" className="cursor-pointer">
                          Remember Me
                        </label>
                      </div>
                    )
                  }
                  {
                    isSignedUp ?(

                      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">

                        <button
                          type="button"
                          onClick={handleSetGuestUser}
                          className="py-2 px-4 rounded-md bg-pink-400 order-3 lg:order-1   mt-12 sm:mt-0">
                          Get guest user credential
                        </button>
                        <Field type="submit" className=" py-2 px-4 bg-blue-400 w-full sm:w-auto rounded-md mt-4 sm:mt-0 cursor-pointer" value="Login"/>

                      </div>

                    ):(
                      <div className="formdiv ">
                        <Field type="submit" className="py-2 px-4 bg-blue-400 rounded-md cursor-pointer" value="Sign up"/>
                      </div>

                    )
                  }
                  <div className="mt-4">
                  {
                    isSignedUp ?
                      <p onClick={()=>setIsSignedUp(false)} className="group text-gray-700 text-center ">Have not signed up ?<span className="group-hover:underline cursor-pointer"> sign up</span></p>
                    :
                      <p onClick={()=>setIsSignedUp(true)} className="group text-gray-700 text-center ">Are you already signed up ?<span className="group-hover:underline cursor-pointer"> sign in</span></p>
                  }


                  </div>
                  {
                    signupLoader || loginLoader && (
                      <p className="mt-4 text-sm text-gray-500 text-center animate-[wiggle_1s_ease-in-out_infinite_alternate]">
                        processing please wait .....
                      </p>

                    )
                  }


                </Form>
              )}
            }

            </Formik>




          </div>
        </div>

    )

  }


export default Signup
Signup.getLayout=function PageLayout(page){
  return(
      <>
        {page}
      </>
  )
}
