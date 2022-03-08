import React,{useState} from 'react'
import Image from "next/image"
import {FaBars} from "react-icons/fa"
import {MdOutlineClose} from "react-icons/md"
import {useSelector,useDispatch} from "react-redux"
import {logoutAction} from "../redux/actions/login.action"
import Link from "next/link"
import {GrFormDown} from "react-icons/gr"
import {BiChevronLeft,BiChevronRight} from "react-icons/bi"
import{RiArrowUpSLine} from "react-icons/ri"
import {useRouter} from "next/router"
const Header = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const [myMenuOpen,setMyMenuOpen]=useState(false)
  const authUser=useSelector(state=>state.loginReducer.authUser)
  const [isSideBarOpen,setIsSideBarOpen]=useState(false)

  const handleLogOut=()=>{
    dispatch(logoutAction())
  }
  const changeCategory=(categoryName)=>{
    router.push(`/category/${categoryName}`)
  }
    return (
        <div className="sticky top-0 w-full  mb-5 flex flex-row md:flex-column flex-wrap   px-4 justify-between items-center text-gray-700 bg-white z-[130] ">
        <div className="lg:w-1/4 sm:w-2/4 w-[80%] relative mt-2  h-[10vh]">
          <Link href={"/"}><Image src="/assets/site-logo.png" alt="site-logo" objectFit="fill" layout="fill"/></Link>
        </div>
        <div className="cursor-pointer lg:hidden"><FaBars fontSize={32} color="gray" onClick={()=>setIsSideBarOpen(true)}/></div>
        <div className="hidden lg:flex lg:w-3/4  mx-auto items-center justify-end  ">
          <div className="  w-full flex  items-center relative   ">
            <li onClick={()=>changeCategory("political")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Political</li>
            <li onClick={()=>changeCategory("entartainment")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Entartainment</li>
            <li onClick={()=>changeCategory("business")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Business</li>
            <li onClick={()=>changeCategory("international")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">International</li>
            <li onClick={()=>changeCategory("sports")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Sports</li>
            <li onClick={()=>changeCategory("educational")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Educational</li>
            <li onClick={()=>changeCategory("others")} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Others</li>
            {
              authUser ?(
                <>
                  <li
                    onClick={()=>setMyMenuOpen(prevState=>!prevState)}
                    className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer flex items-end  ">
                    <p className="capitalize font-bold">{authUser.name?.split(" ")[0]}</p>
                  </li>
                  {
                    myMenuOpen &&(
                      <div
                        className={`absolute right-[2%] z-[100] top-[7vh] bg-gray-300 py-2 px-4 flex flex-col space-y-2`}
                        onClick={()=>setMyMenuOpen(false)}
                      >
                        <li onClick={()=>router.push(`/posts/myPosts`)} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">My Posts</li>
                        <li
                          onClick={handleLogOut}
                          className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                          sign out
                        </li>
                        <Link href={"/posts/actions/create"} passHref>
                          <li
                          className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                            Create New Post
                          </li>
                        </Link>
                      </div>
                    )
                  }

                </>
              ):(
                <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                  <Link href={"/auth/authData"} passHref>Sign In</Link>
                </li>

              )
            }

            <li onClick={()=>router.push(`/posts/myPosts`)} className="list-none hidden hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">My Posts</li>
          </div>
        </div>
        <div className={` fixed top-0 right-0 z-[100] lg:hidden h-[100vh] w-full sm:w-[50vw]  bg-white ${isSideBarOpen ?"translate-x-0":"translate-x-[100vw]" }  transition-all ease-in duration-500 `}>
          <li className="list-none mt-4  mb-6 ml-2 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full  capitalize"><MdOutlineClose fontSize={36} color="red" onClick={()=>setIsSideBarOpen(false)} /></li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Political</li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Entartainment</li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Business</li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">International</li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Sports</li>
          <li onClick={()=>changeCategory()} className="list-none  my-6 hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Educational</li>
          <li onClick={()=>changeCategory()} className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  w-full text-center capitalize">Others</li>
            {
              authUser ?(
                <>
                  <li
                    onClick={()=>setMyMenuOpen(prevState=>!prevState)}
                    className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize flex flex-row items-end mt-3 justify-center ">
                  {
                    myMenuOpen ?
                    <BiChevronRight fontSize={24} color="gray"/>
                    :
                    <BiChevronLeft fontSize={24} color="gray"/>
                  }

                    <span>{authUser.name?.split(" ")[0]}</span>

                  </li>
                  {
                    myMenuOpen &&(
                      <div className="absolute left[-2%] sm:left-[-5%] bottom-[7vh] bg-gray-300 py-2 px-4 flex flex-col space-y-2">
                        <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">My Account</li>
                        <li
                          onClick={handleLogOut}
                          className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                          sign out
                        </li>
                        <Link href={"/posts/create"} passHref>
                          <li
                          className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                            Create New Post
                          </li>
                        </Link>
                      </div>
                    )
                  }

                </>
              ):(
                <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">
                  <Link href={"/auth/authData"} passHref>Sign In</Link>
                </li>

              )
            }


        </div>
      </div>
    )
}

export default Header
