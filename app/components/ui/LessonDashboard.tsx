
'use client'
import  { useEffect,  useState } from 'react'
import { IoHome } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { GoRepoLocked } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
    ssr: false,
    loading: () => <p>Loading video...</p>
})
import { ImUnlocked } from "react-icons/im";
import { getUser } from "@/app/utility";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import dynamic from "next/dynamic";
import Quiz from "./Quiz";
import { message } from "antd";
interface ld {
    data: any,
    getApi: any,
    quiz: any
}
function LessonDashboard(props: ld) {
    const { data, getApi, quiz } = props
    const searchParams = useSearchParams()
    const router = useRouter()
    const [showVideo, setShowVideo] = useState<any>(false)
    const [showQuiz, setShowQuiz] = useState<any>(false)
    const [complete, setComplete] = useState<any>(false)
    const [video, setVideo] = useState<any>({
        id: '',
        title: "",
        url: "",
        is_completed: false
    })
    const handleLinks = (x: any) => {

        setVideo({
            id: x?.lesson_id,
            title: x?.title,
            url: x?.url,
            is_completed: x?.is_completed
        })

    }
    const handleQuiz = () => {
        if (quiz) {
            setShowQuiz(true)
        } else {
            message.error('No quiz available for this course')
        }
    }


    const handleHome = () => router.push('/dashboard/client')

    const updateLessonProgress = () => {
        const user = getUser()
        const payload = {
            user_id: user?.id,
            course_id: Number(searchParams?.get('q')),
            lesson_id: video?.id
        }
        GeneralCoreService('lesson_progress').Save(payload)
            .then((res) => {
                if (res?.status === 201) {
                    getApi(Number(searchParams?.get('q')))
                }
            }).catch((err) => console.log(err)).finally(() => { })
    }

    useEffect(() => {
        if (data && data.length > 0) {
            setVideo({
                id: data[0]?.lesson_id,
                title: data[0]?.title,
                url: data[0]?.url,
                is_completed: data[0]?.is_completed
            })
            setShowVideo(true);
        }
    }, [data]);

    return (

        showQuiz ? <Quiz data={quiz} setShowQuiz={setShowQuiz}/> :

            <div className='flex'>
                
                <div className='bg-rded-300 w-[25%] h-screen border-r border-gray-400'>
                    <div className='h-20 flex items-center pl-4 border-b border-gray-400 cursor-pointer' onClick={handleHome}><p><IoHome className="text-primary" size={20} /></p></div>
                    {

                        // arr.map((x, i) => (
                        //     <div className='mt-4' key={i}>
                        //         <p className='font-bold text-lg p-3'>{x.head}</p>
                        //         {x.videos.map((v, ind) => (
                        //             <li onClick={() => handleLinks(v.title)} className='list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm cursor-pointer hover:bg-red-300' key={ind}>
                        //                 <span className=''><FaRegCircle size={20} className="text-primary mr-2" /></span>
                        //                 <span className=''>{v.icon}</span>
                        //                 {v.title}
                        //             </li>
                        //         ))}

                        //     </div>
                        // ))
                    }
                    {data?.map((v: any, ind: number) => (
                        <li onClick={v?.locked ? () => { } : () => handleLinks(v)} className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm ${v?.locked ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer hover:bg-red-300'} `} key={ind}>
                            <span className=''>{v?.locked ? <GoRepoLocked size={20} className="text-primary mr-2" /> : <ImUnlocked size={20} className="text-primary mr-2" />}</span>
                            <span className=''>{v?.icon}</span>
                            {v.title}
                        </li>
                    ))}
                   {quiz && <li onClick={quiz?.locked ? () => { } : () => handleQuiz()} className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm ${quiz?.locked ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer hover:bg-red-300'} `}>
                        <span className=''>{quiz?.locked ? <GoRepoLocked size={20} className="text-primary mr-2" /> : <ImUnlocked size={20} className="text-primary mr-2" />}</span>
                        Final Exam
                    </li>}
                </div>

                <div className='w-full h-screen'>
                    <div className='bg-redd-300 w-full h-20 border-b border-gray-400 '></div>
                    {/* content */}
                    {showVideo && <div className=' w-full  p-4'>
                        <div className="flex justify-between items-center">
                            <p className='text-xl font-bold p-3'> {video?.title}</p>
                            {video?.is_completed && <p className='text-lg font-normal p-3 flex items-center justify-center gap-3'>Completed <MdOutlineDone color="green" size={25} /> </p>}
                        </div>
                        <VideoPlayer
                            vimeoId={video?.url}
                            setComplete={setComplete}
                            videoDetails={video}
                            updateLessonProgress={updateLessonProgress}
                        />
                    </div>}
                </div>
            </div >

    )
}

export default LessonDashboard