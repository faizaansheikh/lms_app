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
        <div>
            <div
                className="mdr-preview"
                dangerouslySetInnerHTML={{ __html: data?.outline }}
            />
        </div>
    )
}

export default LessonOutline