'use client'
import { titleFromSlug } from '@/app/utility'
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
        GeneralCoreService('courses/lessons').GetAll(id)
            .then((res) => {
                const data = res?.data?.lessons
              
                setCourse(data)

            }).catch((err) => console.log(err)).finally(() => { })
    }
    useEffect(() => {
        getSingleRec(Number(searchParams?.get('q')))
    }, [])


    return (
        <LessonDashboard data={course} />


    )
}

export default page