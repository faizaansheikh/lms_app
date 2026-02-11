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
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)


    const getSingleRec = (id: number) => {
        const user = getUser()
        setLoading(true)
        if (user) {

            const payload = {
                userId: user?.id,
                courseId: id
            }

            GeneralCoreService('courses/lessons').Save(payload)
                .then((res) => {
                    // console.log(res?.data)
                    const lessons = res?.data?.lessons
                    const max = lessons?.map((x: any) => x.lesson_order) || [];
                    setOrder(Math.max(...max));

                    setCourse(res?.data)

                }).catch((err) => console.log(err)).finally(() => setLoading(false))
        } else {
            message.error('Please signup to continue!')
            setLoading(false)
        }
    }


    useEffect(() => {
        setLoading(true)
        getSingleRec(Number(searchParams?.get('q')))

    }, [])


    return (
        <>
            <div className=''>
                <LessonDashboard
                    data={course?.lessons}
                    quiz={course?.finalQuiz}
                    order={order}
                    getApi={getSingleRec}
                    loading={loading}
                />
            </div>

        </>


    )
}

export default page