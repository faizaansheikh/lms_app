import React, { useEffect } from 'react'

function LessonOutline({ data, updateLessonProgress }: any) {

    useEffect(() => {
        if (data?.url === '' && !data?.quiz) {
            const timer = setTimeout(() => {
                updateLessonProgress()
            }, 3000);

            return () => clearTimeout(timer)
        }

    }, [])
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
  background: #fafafa;
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