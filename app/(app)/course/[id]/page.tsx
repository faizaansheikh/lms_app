'use client'
import { getUser, titleFromSlug } from '@/app/utility'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useLessonContext } from '@/app/context/LessonContext'
import LessonDashboard from '@/app/components/ui/LessonDashboard'
import { GeneralCoreService } from '@/app/config/GeneralCoreService'
import { useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import Xloader from '@/app/components/ui/Xloader'
// import VideoPlayer from '@/app/components/ui/VideoPlayer'


function page() {


    const searchParams = useSearchParams()
    const [course, setCourse] = useState<any>([])
    const [loading, setLoading] = useState<any>(false)


    const getSingleRec = (id: number) => {
        setLoading(true)
        const user = getUser()
        if (user) {
            const payload = {
                userId: user?.id,
                courseId: id
            }
            GeneralCoreService('courses/lessons').Save(payload)
                .then((res) => {
                    // console.log(res?.data)
                    const lessons = res?.data?.lessons
                    //   setEditor(turnDown(res?.data?.outline))
                    setCourse(res?.data)

                }).catch((err) => console.log(err)).finally(() => setLoading(false))
        } else {
            message.error('Please signup to continue!')
            setLoading(false)
        }
    }


    useEffect(() => {
        getSingleRec(Number(searchParams?.get('q')))

    }, [])


    return (
        <>
            <div className="relative h-full">

        
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <Spin size="large" />
                    </div>
                )}

      
                <div className={`${loading ? "blur-sm pointer-events-none" : ""}`}>
                    <LessonDashboard
                        data={course?.lessons}
                        quiz={course?.finalQuiz}
                        getApi={getSingleRec}
                    />
                </div>

            </div>

        </>


    )
}

export default page