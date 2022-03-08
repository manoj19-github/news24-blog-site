import React from 'react'
import {BsApple} from "react-icons/bs"
import {FaGooglePlay} from "react-icons/fa"
const Footer = () => {
    return (
        <div className="w-full min-h-[50vh] bg-[#00354A] text-white text-xs py-4 pl-4 pr-4 flex md:flex-row flex-col  justify-between ">
          <div className=" mt-12 lg:mt-4">
            <h3 className="text-center text-base text-gray-400 mb-2">News</h3>
            <div className="flex flex-col space-y-2.5">
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Politics</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Entartainment</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Business</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">International</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Sports</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Educational</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Others</li>
            </div>
          </div>
          <div className=" mt-12 lg:mt-4">
            <h3 className="text-center text-base text-gray-400 mb-2">Opinion</h3>
            <div className="flex flex-col space-y-2.5">
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">editorial</li>
            <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">letters to the editor</li>
            </div>
          </div>
          <div className=" mt-12 lg:mt-4">
            <h3 className="text-center text-base text-gray-400 mb-2">Living</h3>
            <div className="flex flex-col space-y-2.5">
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">lifestyle</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Travel</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Recipes</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Book Review</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Leisure</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Quiz</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Horoscope</li>
            </div>
          </div>
          <div className=" mt-12 lg:mt-4">
            <h3 className="text-center text-base text-gray-400 mb-2">More</h3>
            <div className="flex flex-col space-y-2.5">
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Photo</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Video</li>
              <li className="list-none hover:underline transition-all duration-500 ease-in cursor-pointer  flex-1 text-center capitalize">Sunday Special</li>
            </div>
          </div>
          <div className=" mt-12 lg:mt-4">
            <h3 className="text-center text-base text-gray-400 mb-2">Download The Latest News24 App</h3>
          <div className="flex flex-col space-y-2.5 items-center mt-2  ">
              <li className="list-none flex space-x-2.5 bg-white w-[200px] lg:w-2/3 p-2 rounded-lg items-center ">
                <BsApple fontSize={24} color="#00354A" />
                <div className="text-[#00354A] text-center">
                    <p className="font-bold text-[13px]">Download on the</p>
                  <p className="text-base font-bold">App Store</p>
                </div>
              </li>
              <li className="list-none flex space-x-2.5 bg-white w-[200px] lg:w-2/3 p-2 rounded-lg items-center ">
                <FaGooglePlay fontSize={24}  color="#00354A" />
                <div className="text-[#00354A] text-center">
                    <p className="font-bold text-[13px]">Download on the</p>
                  <p className="text-base font-bold">Google Play</p>
                </div>
              </li>

            </div>
          </div>

        </div>
    )
}

export default Footer
