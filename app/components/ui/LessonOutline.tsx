import React, { useEffect } from 'react'
import { MdOutlineDone } from "react-icons/md";
function LessonOutline({ data, updateLessonProgress }: any) {

    useEffect(() => {
        if (data?.url === '' && !data?.quiz && !data?.is_completed) {
            const timer = setTimeout(() => {
                updateLessonProgress()
            }, 5000);

            return () => clearTimeout(timer)
        }

    }, [data])
    return (

        <>
           
            <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center">
           
                {data?.is_completed && (
                    <p className="text-lg font-normal p-3 flex items-center gap-3">
                        Completed <MdOutlineDone color="green" size={25} />
                    </p>
                )}
            </div>
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