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

        const user = getUser()
        if (user) {
            const payload = {
                userId: user?.id,
                courseId: id
            }
            setLoading(true)
            GeneralCoreService('courses/lessons').Save(payload)
                .then((res) => {
                    // console.log(res?.data)
                    const lessons = res?.data?.lessons
                    //   setEditor(turnDown(res?.data?.outline))
                    setCourse(res?.data)

                }).catch((err) => console.log(err)).finally(() => setLoading(false))
        } else {
            message.error('Please signup to continue!')
        }
    }


    useEffect(() => {
        getSingleRec(Number(searchParams?.get('q')))

    }, [])


    return (
        <>
            <div className="relative h-full">


                


                <div className=''>
                    <LessonDashboard
                        data={course?.lessons}
                        quiz={course?.finalQuiz}
                        getApi={getSingleRec}
                        loading={loading}
                    />
                </div>

            </div>

        </>


    )
}

export default page