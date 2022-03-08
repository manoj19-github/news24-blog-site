import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { Markup } from 'interweave';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const EditorComponent = ({descData,setDesc}) => {
  const handleDescChange=(descChange)=>{
    setDesc(descChange)
  }
    return (
        <div>
          <Editor
            editorState={descData}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="border-b border-gray-500 min-h-[30vh] mb-4"
            onEditorStateChange={handleDescChange}
          />
        </div>
    )
}

export default EditorComponent
