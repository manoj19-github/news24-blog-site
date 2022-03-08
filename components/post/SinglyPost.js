import React from 'react'
import Image from "next/image"
import {BsCalendarDate} from "react-icons/bs"
import  { AiOutlineUser} from "react-icons/ai"
import moment from "moment"
import Link from "next/link"
import BindHtml from 'react-bind-html';
const SinglyPost = ({postData}) => {
    return (
        <div className="w-full">
            <div className="w-full relative h-[75vh]">
              <Image
                src={`${postData.image}`}
                alt={"ukrain-war"}
                layout="fill"
                objectFit="fill"
              />
            </div>
            <div className="w-full mt-3 flex flex-col  sm:flex-row items-center justify-between pl-4 pr-4">
              <p className="flex items-center my-4 sm:my-0">
                <BsCalendarDate fontSize={18} color="gray" />
                  <span className="ml-4 text-[12px]">
                    posted  {moment(postData.updatedAt).fromNow()}
                  </span>
              </p>
              <Link href={`/author/${postData.user._id}`} passHref>
                <p className="cursor-pointer flex items-center my-2 sm:my-0">
                  <AiOutlineUser fontSize={18} color="gray" className="mr-2" />
                  <span className="text-[12px]">
                    posted by {postData.user.name}
                  </span>
                </p>
              </Link>
            </div>
            <div className="mt-4 mx-2 text-2xl text-gray-500">
              {postData.title}

            </div>
            <div className="mt-7 mx-2 text-sm ">
                <BindHtml html={postData.desc}/>
            </div>

        </div>
    )
}

export default SinglyPost
