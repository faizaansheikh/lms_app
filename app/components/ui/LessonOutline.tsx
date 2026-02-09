import React, { useEffect } from 'react'
import { MdOutlineDone } from "react-icons/md";
function LessonOutline({ data, updateLessonProgress }: any) {

    // useEffect(() => {
    //     if (data?.url === '' && !data?.quiz && !data?.is_completed) {
    //         const timer = setTimeout(() => {
    //             updateLessonProgress()
    //         }, 5000);

    //         return () => clearTimeout(timer)
    //     }

    // }, [data])
    return (

        <>
           
           
             <div
                className="mdr-preview"
                dangerouslySetInnerHTML={{ __html: data?.outline }}
            />
            <style jsx>{`
       
.mdr-preview {
  width: 100%;
  min-width: 300px;
  padding: 12px;
//   background: #fafafa;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
       
      `}</style>
        </>

    )
}

export default LessonOutline