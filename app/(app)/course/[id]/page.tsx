'use client'
import { getUser, titleFromSlug } from '@/app/utility'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useLessonContext } from '@/app/context/LessonContext'
import LessonDashboard from '@/app/components/ui/LessonDashboard'
import { GeneralCoreService } from '@/app/config/GeneralCoreService'
import { useEffect, useState } from 'react'
// import VideoPlayer from '@/app/components/ui/VideoPlayer'

const VideoPlayer = dynamic(() => import('@/app/components/ui/VideoPlayer'), {
    ssr: false,
    loading: () => <p>Loading video...</p>
})
function page() {


    const searchParams = useSearchParams()
    const [course, setCourse] = useState([])

    const getSingleRec = (id: number) => {
        const user = getUser()
        if (user) {
            const payload = {
                userId: user?.id,
                courseId: id
            }
            GeneralCoreService('courses/lessons').Save(payload)
                .then((res) => {
                    // const data = res?.data?.lessons
                    // setCourse(data)
                    console.log(res?.data)

                }).catch((err) => console.log(err)).finally(() => { })
        }
    }
    useEffect(() => {
        getSingleRec(Number(searchParams?.get('q')))
    }, [])


    return (
        <LessonDashboard data={course} />


    )
}

export default page