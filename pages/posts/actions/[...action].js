import React,{useState,useEffect,useRef} from 'react'
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw } from "draft-js";
import { Markup } from 'interweave';
import draftToHtml from "draftjs-to-html";
import Image from "next/image"
import {useRouter} from "next/router"
import {useDispatch,useSelector} from "react-redux"
import * as cookieParser from "cookie"
import {updateAction,insertAction} from "../../../redux/actions/authorPosts.action"

var Editor = dynamic(() => import("../../../components/EditorComponent"), {
  ssr: false
})

const CreatePost = ({editPostData}) => {
    const editPost=editPostData ? editPostData.mypost:null
    const dispatch=useDispatch()
    const router=useRouter()
    const isEditPost=router.query.action[0]==="edit"
    const inputRef=useRef(null)
    const [myTitle,setMyTitle]=useState(editPost?.title ||"")
    const [myCategory,setMyCategory]=useState(editPost?.category || "Political")
    const [desc,setDesc]=useState(EditorState.createEmpty())
    const [imageData,setImageData]=useState(null)
    const [selectedFile,setSelectedFile]=useState(editPost?.image ||null)
    const authToken=useSelector(state=>state.loginReducer.userToken)
    useEffect(()=>{
      if(!authToken){
        router.replace("/")
      }
    },[dispatch,authToken])
    const changeEvent=(event)=>{
      setImageData(event.target.files[0])
      const reader=new FileReader()
      if(event.target.files[0]){
          reader.readAsDataURL(event.target.files[0])
      }
      reader.addEventListener("load",(readerEvent)=>{
        setSelectedFile(readerEvent.target.result)
      })
    }
    useEffect(()=>{
      inputRef.current.focus()
    },[])
    const handleSubmit=(e)=>{
      e.preventDefault()
      const descData=draftToHtml(convertToRaw(desc.getCurrentContent()))
      if(isEditPost && editPost){
        alert("yes this")
        const isImageChange=imageData? 1 : 0
        dispatch(updateAction(editPost._id,myTitle,myCategory,descData,imageData,isImageChange,router))
      }else{
        alert("yes no this")
        dispatch(insertAction(myTitle,myCategory,descData,imageData,router))
      }

    }


    return (
        <div className="flex flex-col w-[90%] lg:w-3/4 mx-auto">
          <h1 className="mb-4 text-gray-500 text-center text-2xl lg:text-4xl">Write Your New Post</h1>
          <form onSubmit={handleSubmit}>

            <label className="text-gray-500 my-2">News Title</label>
            <textarea ref={inputRef}
              onChange={e=>setMyTitle(e.target.value)}
              value={myTitle}
              className="w-full min-h-[2rem] border-b border-gray-500 mb-4 outline-none focus:outline-none"
            />
            <label className="text-gray-500 my-2">News Description</label>
            <Editor
              descData={desc}
              setDesc={setDesc}
            />
            <label className="text-gray-500 mt-4 mb-5">News Image</label>
            <input type="file" className="w-full outline-none mt-2 cursor-pointer" onChange={changeEvent}/>
            {
              selectedFile && (
                <div className="w-full mt-5 relative h-[25rem]">
                  <Image src={selectedFile} layout="fill" objectFit="fill"/>
                </div>
              )
            }
            <label className="text-gray-500 mt-5 mb-2">Category</label>
            <select value={myCategory}
              onChange={(e)=>setMyCategory(e.target.value)}
              className="w-full mt-5 outline-none cursor-pointer border-b border-gray-500"
            >
              <option value="Political">Political</option>
              <option value="Entartainment">Entartainment</option>
              <option value="Business">Business</option>
              <option value="International">International</option>
              <option value="Sports">Sports</option>
              <option value="Educational">Educational</option>
              <option value="Others">Others</option>
            </select>
            <input type="submit"
              value="Save"
              className="w-full mt-5 outline-none cursor-pointer bg-blue-500 rounded-md text-white py-4"
            />
          </form>



            <Markup content={draftToHtml(convertToRaw(desc.getCurrentContent()))} />
        </div>
    )

}

export default CreatePost

export  async function getServerSideProps(context){
  try{
      const isEditAction=context.params.action[0]==="edit"
      if(isEditAction){
        const aresp=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/myposts/${context.params.action[1]}`,{
          headers:{
            authorization:`Bearer ${cookieParser.parse(context.req.headers.cookie).userToken}`
          }
        })
        const resp=await aresp.json()

        return{
          props:{
            editPostData:resp
          }
        }
      }else{
        return {
          props:{
            editPostData:null
          }
        }
      }

  }catch(err){
    console.log(err)
      return {
        props:{
          editPostData:null
        }
      }
  }

}
