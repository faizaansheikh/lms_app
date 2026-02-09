
'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { GoRepoLocked } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
import { GrBladesVertical } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { LuListCollapse } from "react-icons/lu";
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
  loading: () => <p>Loading video...</p>
})
import { MdOutlineOndemandVideo } from "react-icons/md";
import { ImUnlocked } from "react-icons/im";
import { getUser, turnDown } from "@/app/utility";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import dynamic from "next/dynamic";
import Quiz from "./Quiz";
import { message, Spin, Tabs } from "antd";
import LessonQuiz from './LessonQuiz';
import { IoMdBook } from "react-icons/io";
import LessonOutline from './LessonOutline';
interface ld {
  data: any,
  getApi: any,
  quiz: any,
  loading: any
}
function LessonDashboard(props: ld) {
  const { data, getApi, quiz, loading } = props
  const isInitialized = useRef(false);
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
    quiz: null,
    is_completed: false
  })
  const handleLinks = async (x: any) => {

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
    if (window.innerWidth >= 1024) {
      // Desktop
      setIsHide(false);
    } else {
      // Mobile / Tablet
      setIsHide(true);
    }


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
          const index = data?.findIndex((item: any) => item.lesson_id === video?.id);
          const nextItem = index !== -1 ? data[index + 1] : undefined;
          setActive(nextItem?.lesson_id)
          handleLinks(nextItem)

        }
      }).catch((err) => console.log(err)).finally(() => { })
  }

  useEffect(() => {
    if (!isInitialized.current && data && data.length > 0) {
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

      isInitialized.current = true;
    }
  }, [data]);







  const onChange = (key: string) => {
    setTabs(key);
  };
  const handleComplete = () => {
    if (!video?.is_completed) {
      updateLessonProgress()
    } else {
      const index = data?.findIndex((item: any) => item.lesson_id === video?.id);
      const nextItem = index !== -1 ? data[index + 1] : undefined;
      setActive(nextItem?.lesson_id)
      handleLinks(nextItem)

    }



  }

  const items: any = [
    {
      key: "1",
      label: '',
      children:
        <>
          <div className="text-2xl font-bold flex justify-between items-center gap-4  ">
            <span className='mt-1'>{video.url ? <MdOutlineOndemandVideo size={25} /> : <IoMdBook size={25} />}</span>
            {video.title}
            {video?.is_completed ? (
              <p className="text-lg font-normal p-3 flex items-center gap-3">
                Completed <MdOutlineDone color="green" size={25} />
              </p>
            ) : <p></p>}
          </div>

          {(video?.url && showVideo) && (
            <div className="w-full py-6">

              <VideoPlayer
                vimeoId={video?.url}
                setComplete={setComplete}
                videoDetails={video}
                updateLessonProgress={video?.quiz ? () => { } : updateLessonProgress}
              />
            </div>
          )}
          <LessonOutline data={video} updateLessonProgress={updateLessonProgress} />
          {
            video?.quiz && <LessonQuiz
              quiz={video.quiz}
              updateLessonProgress={updateLessonProgress}
            />
          }
          {(!video?.quiz && !video?.url) && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleComplete}
                className="flex items-center justify-center gap-4 cursor-pointer hover:bg-red-700 text-[16px] rounded-lg text-white bg-red-600 font-semibold px-5 py-3"
              >
                Complete and Continue
                <span><MdNavigateNext size={22} /></span>
              </button>
            </div>
          )}



        </>

    },


  ].filter(Boolean);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop
        setIsHide(false);
      } else {
        // Mobile / Tablet
        setIsHide(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* {loading && (
        <div className="">
          <Spin size="large" />
        </div>
      )} */}
      {
        showQuiz ? <Quiz data={quiz} setShowQuiz={setShowQuiz} /> :
          <div className={`flex h-screen overflow-hidden relative `}>

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
        ${isHide ? "lg:w-18 px-8" : "w-100  lg:w-78"}
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
                          <LuListCollapse size={20} />
                        </span>
                      </div>

                      <ul className="overflow-y-auto max-h-[calc(100vh-5rem)] mb-4">
                        {data?.map((v: any, ind: number) => (
                          <li
                            key={ind}
                            className={`list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm 
                    ${active === v?.lesson_id ? "bg-red-200" : ""} 
                    ${v?.locked ? "cursor-not-allowed bg-gray-200" : "cursor-pointer hover:bg-red-300"}`}
                            onClick={v?.locked ? () => { } : () => handleLinks(v)}
                          >
                            <div>
                              {v?.locked ? (
                                <GoRepoLocked size={20} className="text-primary " />
                              ) : (
                                <ImUnlocked size={20} className="text-primary " />
                              )}
                            </div>

                            <div className="truncate flex items-center gap-2 text-gray-700"><span>{v.url ? <MdOutlineOndemandVideo size={20} /> : <IoMdBook size={20} />}</span> {v.title}</div>
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
                        <LuListCollapse size={20} />
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
            <div className={`flex-1 flex flex-col lg:ml-0 `}>

              <header className="bg-secondary h-16 shadow px-6 flex items-center justify-between">

             
                <button
                  onClick={() => setIsHide(false)}
                  className="lg:hidden text-prismary"
                >
                  <LuListCollapse size={22} color='red'/>
                </button>

              </header>


              <main className={`h-full px-4 py-6 overflow-auto bg-[#f1f1f3] `}>
              

               
                  <div className="text-2xl font-bold flex justify-between items-center gap-4   border-b border-gray-400">
                    <span className='mt-1 flex items-center gap-4'>{video.url ? <MdOutlineOndemandVideo size={25} /> : <IoMdBook size={25} />}  {video.title}</span>
                   
                    {video?.is_completed ? (
                      <p className="text-lg font-normal p-3 flex items-center gap-3">
                        Completed <MdOutlineDone color="green" size={25} />
                      </p>
                    ) : <p></p>}
                  </div>

                  {(video?.url && showVideo) && (
                    <div className="w-full py-6">

                      <VideoPlayer
                        vimeoId={video?.url}
                        setComplete={setComplete}
                        videoDetails={video}
                        updateLessonProgress={video?.quiz ? () => { } : updateLessonProgress}
                      />
                    </div>
                  )}
                  <LessonOutline data={video} updateLessonProgress={updateLessonProgress} />
                  {
                    video?.quiz && <LessonQuiz
                      quiz={video.quiz}
                      updateLessonProgress={updateLessonProgress}
                    />
                  }
                  {(!video?.quiz && !video?.url) && (
                    <div className="flex justify-center mb-4">
                      <button
                        onClick={handleComplete}
                        className="flex items-center justify-center gap-4 cursor-pointer hover:bg-red-700 text-[16px] rounded-lg text-white bg-red-600 font-semibold px-5 py-3"
                      >
                        Complete and Continue
                        <span><MdNavigateNext size={22} /></span>
                      </button>
                    </div>
                  )}



                
              </main>
            </div>

          </div>
      }
    </>




  )
}

export default LessonDashboard
