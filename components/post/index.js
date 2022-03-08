import React from 'react'
import Image from "next/image"
import {BsCalendarDate} from "react-icons/bs"
import  { AiOutlineUser} from "react-icons/ai"
import Link from "next/link"
import moment from "moment"
import {BiEdit} from "react-icons/bi"
import {AiOutlineDelete} from "react-icons/ai"
import BindHtml from "react-bind-html"
import {deleteAction} from "../../redux/actions/authorPosts.action"
import Swal from "sweetalert2"
import {useRouter} from "next/router"
import {useDispatch} from "react-redux"
const Post = ({postData,relatedPost,isMyPost}) => {
  const dispatch=useDispatch()
  const router=useRouter()
  const deletePostRequest=(deleteId)=>{
        Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(deleteId,router))   

      }
    })

  }


    return (
      <Link href={`/posts/${postData._id}`} passHref>
        <div
          className={`w-full bg-white dark:bg-slate-900 flex flex-col ${relatedPost ?"mb-8 ": "lg:flex-row mb-12" }  justify-between   `}

          >
          <div className={`w-full ${relatedPost?"w-full h-[12rem]" :"lg:w-[40%] h-[50vh] lg:h-[35vh]"} relative  cursor-pointer`}>

              <Image src={`${postData.image}`} layout="fill" objectFit="fill" />

          </div>
          <div className={`w-full ${relatedPost ?"w-full" :"lg:w-[60%]"}  mb-4 sm:mb-0 text-center pt-4 pl-2`}>
            <div className={`w-full flex flex-col items-center justify-between   ${relatedPost ?"p-0 space-y-2":"pl-4 pr-4 sm:flex-row   "} `}>
              <p className="flex items-center my-4 sm:my-0">
                <BsCalendarDate fontSize={28} color="gray" /><span className="ml-4 text-[12px]">
                  posted at {moment(postData.updatedAt).fromNow()} </span></p>

                <p className="cursor-pointer flex items-center my-2 sm:my-0">

                    <>
                      <AiOutlineUser fontSize={28} color="gray" />
                      <Link href={`/author/${postData.user._id}`} passHref>
                      {
                        isMyPost ?
                        <span className="text-[12px] ">
                          posted by You
                        </span>
                          :
                          <span className="text-[12px]">
                            posted by {postData.user.name}
                          </span>

                      }

                      </Link>
                    </>

                </p>

            </div>
          {  isMyPost && (
            <div className="flex flex-row justify-between items-center px-3  mt-4">
              <p className="cursor-pointer">
                <BiEdit fontSize={24} color="yellow" onClick={()=>router.push(`/posts/actions/edit/${postData._id}`)}/></p>
              <p className="cursor-pointer">
                <AiOutlineDelete fontSize={24} color="red" onClick={()=>deletePostRequest(postData._id)}/>
              </p>
            </div>
          )}

              <h3 className="title mt-4 line-clamp-2 " >
                {postData.title}
              </h3>



            <p className="line-clamp-3 text-sm text-gray-600 mt-4">
              <BindHtml html={postData.desc}/>

            </p>
            {
              !relatedPost && (
                <div className="flex flex-row justify-end">

                      <button className="py-2 px-4 text-sm bg-blue-300 text-gray-700 rounded-md mt-2">
                        Read More
                      </button>

                </div>


              )
            }

          </div>

        </div>
      </Link>
    )
}

export default Post
