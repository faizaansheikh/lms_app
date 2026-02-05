
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { GoRepoLocked } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
import { GrBladesVertical } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { Popover } from 'antd';
import { useTheme } from 'next-themes';
import { removeAuthToken } from '@/app/components/authToken';
import { CiViewTable } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { RiAccountBox2Fill } from "react-icons/ri";
import { SiQuizlet } from "react-icons/si";
import { MdReviews } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
  loading: () => <p>Loading video...</p>
})
import { ImUnlocked } from "react-icons/im";
import { getUser, turnDown } from "@/app/utility";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import dynamic from "next/dynamic";
import Quiz from "./Quiz";
import { message, Tabs } from "antd";
import LessonQuiz from './LessonQuiz';
import LessonOutline from './LessonOutline';
interface ld {
  data: any,
  getApi: any,
  quiz: any,

}
function LessonDashboard(props: ld) {
  const { data, getApi, quiz } = props
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showVideo, setShowVideo] = useState<any>(false)
  const [showQuiz, setShowQuiz] = useState<any>(false)
  const [complete, setComplete] = useState<any>(false)
  const [active, setActive] = useState<any>(null)

  const [tabs, setTabs] = useState<any>('1')
  const [isHide, setIsHide] = useState(false)
  const [video, setVideo] = useState<any>({
    id: '',
    title: "",
    url: "",
    outline: "",
    quiz: {},
    is_completed: false
  })
  const handleLinks = async (x: any) => {
    setIsHide(!isHide)
    setTabs('1')
    setActive(x?.lesson_id)
    setVideo({
      id: x?.lesson_id,
      title: x?.title,
      url: x?.url,
      outline: x?.outline,
      quiz: x?.quiz,
      is_completed: x?.is_completed
    })

    setShowVideo(false);
    setTimeout(() => {
      setShowVideo(true);
    }, 200);
  }
  const handleQuiz = () => {
    if (quiz) {
      setShowQuiz(true)
    } else {
      message.error('No quiz available for this course')
    }


    // if (!quiz?.locked) {
    //     message.warning('You have already attempted this quiz')
    //     setShowQuiz(false)
    // }
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
          setTabs('1')
        }
      }).catch((err) => console.log(err)).finally(() => { })
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setVideo({
        id: data[0]?.lesson_id,
        title: data[0]?.title,
        url: data[0]?.url,
        outline: data[0]?.outline,
        quiz: data[0]?.quiz,
        is_completed: data[0]?.is_completed
      })

      setShowVideo(true);
      setActive(data[0]?.lesson_id)
    }
  }, [data]);







  const onChange = (key: string) => {
    setTabs(key);
  };



  return (

    showQuiz ? <Quiz data={quiz} setShowQuiz={setShowQuiz} /> :
      <div className="flex h-screen overflow-hidden relative">

        {!isHide && (
          <div
            onClick={() => setIsHide(true)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        <div
          className={`
    fixed lg:static top-0 left-0 z-50
    h-full
    bg-[whitesmoke] md:bg-transparent
    transition-transform duration-300 ease-in-out
    ${isHide ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
  `}
        >

          <div
            className={`
        h-full p-4  mb-2 overflow-hidden
        ${isHide ? "lg:w-18 px-8" : "w-100  lg:w-72"}
      `}
          >


            {
              !isHide ? (
                <>
                  <div className='h-auto flex justify-between mt-4 mb-6 items-center'>
                    <div
                      className="flex items-center border-gray-400 cursor-pointer"
                      onClick={handleHome}
                    >
                      <IoHome className="text-primary" size={23} />
                    </div>
                    <span
                      className='text-text cursor-pointer'
                      onClick={() => setIsHide(true)}
                    >
                      <GrBladesVertical size={20} />
                    </span>
                  </div>

                  <ul className="overflow-y-auto max-h-[calc(100vh-5rem)] mb-4">
                    {data?.map((v: any, ind: number) => (
                      <li
                        key={ind}
                        className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm 
                    ${active === v?.lesson_id ? "bg-red-200" : ""} 
                    ${v?.locked ? "cursor-not-allowed bg-gray-300" : "cursor-pointer hover:bg-red-300"}`}
                        onClick={v?.locked ? () => { } : () => handleLinks(v)}
                      >
                        {v?.locked ? (
                          <GoRepoLocked size={20} className="text-primary " />
                        ) : (
                          <ImUnlocked size={20} className="text-primary " />
                        )}
                        <span>{v?.icon}</span>
                        <span className="truncate">{v.title}</span>
                      </li>
                    ))}

                    {quiz && (
                      <li
                        onClick={quiz?.locked ? () => { } : () => handleQuiz()}
                        className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm 
                    ${quiz?.locked ? "cursor-not-allowed bg-gray-300" : "cursor-pointer hover:bg-red-300"}`}
                      >
                        {quiz?.locked ? (
                          <GoRepoLocked size={20} className="text-primary " />
                        ) : (
                          <ImUnlocked size={20} className="text-primary " />
                        )}
                        Final Exam
                      </li>
                    )}
                   
                  </ul>
                </>
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <span
                    className='py-4 cursor-pointer'
                    onClick={() => setIsHide(false)}
                  >
                    <GrBladesVertical size={20} />
                  </span>

                  <ul className="overflow-y-auto max-h-[calc(100vh-5rem)] mt-4 ">
                    {data?.map((x: any, ind: any) => (
                      <li
                        key={ind}
                        className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm 
                    ${active === x?.lesson_id ? "bg-red-200" : ""} 
                    ${x?.locked ? "cursor-not-allowed bg-gray-300" : "cursor-pointer hover:bg-red-300"}`}
                        onClick={x?.locked ? () => { } : () => handleLinks(x)}
                      >
                        {x?.locked ? (
                          <GoRepoLocked size={20} className="text-primary " />
                        ) : (
                          <ImUnlocked size={20} className="text-primary " />
                        )}
                      </li>
                    ))}

                    {quiz && (
                      <li
                        onClick={quiz?.locked ? () => { } : () => handleQuiz()}
                        className={`list-none p-4  border-t border-b border-gray-400 flex items-center gap-3 text-sm 
                    ${quiz?.locked ? "cursor-not-allowed bg-gray-300" : "cursor-pointer hover:bg-red-300"}`}
                      >
                        {quiz?.locked ? (
                          <GoRepoLocked size={20} className="text-primary " />
                        ) : (
                          <ImUnlocked size={20} className="text-primary " />
                        )}
                      </li>
                    )}
                  
                  </ul>
                </div>
              )
            }
          </div>
        </div>

        {/* 🧱 Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">

          <header className="bg-secondary h-16 shadow px-6 flex items-center justify-between">

            {/* ☰ Mobile Menu Button */}
            <button
              onClick={() => setIsHide(false)}
              className="lg:hidden text-prismary"
            >
              <GrBladesVertical size={22} />
            </button>

          </header>


          <main className="h-full p-4 overflow-auto bg-[#f1f1f3]">
            <div className="flex-1 overflow-auto">
              <div className="flex-1  overflow-auto">
                <Tabs
                  activeKey={tabs}
                  onChange={onChange}
                  items={[
                    {
                      key: "1",
                      label: "Outline",
                      children: video?.outline ? (
                        <LessonOutline data={video} updateLessonProgress={updateLessonProgress} />
                      ) : (
                        "No outline for this lesson!"
                      ),
                    },
                    {
                      key: "2",
                      label: "Lecture",
                      children: video?.url ? (
                        showVideo && (
                          <div className="w-full p-2">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                              <p className="text-xl font-bold p-3">{video?.title}</p>
                              {video?.is_completed && (
                                <p className="text-lg font-normal p-3 flex items-center gap-3">
                                  Completed <MdOutlineDone color="green" size={25} />
                                </p>
                              )}
                            </div>
                            <VideoPlayer
                              vimeoId={video?.url}
                              setComplete={setComplete}
                              videoDetails={video}
                              updateLessonProgress={video?.quiz ? () => { } : updateLessonProgress}
                            />
                          </div>
                        )
                      ) : (
                        "No lecture available for this lesson!"
                      ),
                    },
                    {
                      key: "3",
                      label: "Quiz",
                      children: video?.quiz ? (
                        <LessonQuiz quiz={video?.quiz} updateLessonProgress={updateLessonProgress} />
                      ) : (
                        "No quiz for this lesson!"
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </main>
        </div>

      </div>




  )
}

export default LessonDashboard
