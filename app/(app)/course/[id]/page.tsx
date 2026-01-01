'use client'
import { titleFromSlug } from '@/app/utility'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
// import VideoPlayer from '@/app/components/ui/VideoPlayer'

const VideoPlayer = dynamic(() => import('@/app/components/ui/VideoPlayer'), {
    ssr: false,
    loading: () => <p>Loading video...</p>
})
function page() {
    const param = useSearchParams()
    const search = param.get('q') || ''
    const title = titleFromSlug(search);


    return (
        <>
            <p className='text-xl font-bold'> {title}</p>
            <VideoPlayer vimeoId={'1150647491'} />
        </>
    )
}

export default page