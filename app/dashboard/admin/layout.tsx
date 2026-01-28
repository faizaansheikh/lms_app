'use client'
import React, { useEffect, useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { Popover } from 'antd';
import { useTheme } from 'next-themes';
import { GrBladesVertical } from "react-icons/gr";
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
function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [activeClass, setActiveClass] = useState({
        light: true,
        dark: false
    });


    const router = useRouter()
    const [isHide, setIsHide] = useState(false)
    const menues = [
        {
            label: 'Dashboard',
            icon: (s: number, c: string) => <RxDashboard size={s} color={c} />
        },
        {
            label: 'Users',
            icon: (s: number, c: string) => <FaUsers size={s} color={c} />
        },
        {
            label: 'Courses',
            icon: (s: number, c: string) => <MdOutlinePlayLesson size={s} color={c} />
        },
        {
            label: 'Course Details',
            icon: (s: number, c: string) => <IoIosArrowRoundForward size={s} color={c} />
        },

        {
            label: 'Lessons',
            icon: (s: number, c: string) => <IoIosArrowRoundForward size={s} color={c} />
        },
        {
            label: 'Add lessons in courses',
            icon: (s: number, c: string) => <IoIosArrowRoundForward size={s} color={c} />
        },
        {
            label: 'Progress',
            icon: (s: number, c: string) => <GiProgression size={s} color={c} />
        },
        {
            label: 'Enrollment',
            icon: (s: number, c: string) => <RiAccountBox2Fill size={s} color={c} />
        },
        {
            label: 'Quiz',
            icon: (s: number, c: string) => <SiQuizlet size={s} color={c} />
        },
        {
            label: 'Questions',
            icon: (s: number, c: string) => <SiQuizlet size={s} color={c} />
        },
        {
            label: 'Reviews',
            icon: (s: number, c: string) => <MdReviews size={s} color={c} />
        },
        {
            label: 'Certificate',
            icon: (s: number, c: string) => <GrCertificate size={s} color={c} />
        }


    ]
    const handleTheme = (theme: string) => {
        setTheme(theme)
        if (theme === 'light') {
            setActiveClass({
                dark: false,
                light: true
            })
        } else {
            setActiveClass({
                light: false,
                dark: true
            })
        }
    }
    const handleRoutes = (label: string) => {
        if (label === 'Dashboard') {
            router.replace('/dashboard/admin')
        } else if (label === 'Users') {
            router.push('/dashboard/admin/users')
        } else if (label === 'Courses') {
            router.push('/dashboard/admin/courses')
        } else if (label === 'Lessons') {
            router.push('/dashboard/admin/lessons')
        } else if (label === 'Add lessons in courses') {
            router.push('/dashboard/admin/course_lessons')
        } else if (label === 'Enrollment') {
            router.push('/dashboard/admin/enrollment')
        } else if (label === 'Progress') {
            router.push('/dashboard/admin/lesson_progress')
        } else if (label === 'Quiz') {
            router.push('/dashboard/admin/quiz')
        } else if (label === 'Questions') {
            router.push('/dashboard/admin/questions')
        } else if (label === 'Course Details') {
            router.push('/dashboard/admin/events')
        } else if (label === 'Reviews') {
            router.push('/dashboard/admin/reviews')
        }else if (label === 'Certificate') {
            router.push('/dashboard/admin/certificate')
        }
        return
    }
    const handleLogout = () => {
        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            localStorage.removeItem('userInfo')
            removeAuthToken()
            router.push('/home')
        }

    }

    return (

        <div className="flex h-screen overflow-hidden">
            <div className={`bg-secondary ${isHide ? 'w-16' : 'w-64'} h-[100%]`}>
                <div className={`bg-secondary ${isHide ? 'w-16' : 'w-64'} h-[100%]  p-4 transition-all duration-300`}>
                    {
                        !isHide ? <>
                            <div className='flex justify-end mt-2 items-center'>
                                {/* <p className=' text-2xl my-3'>Logo</p> */}
                                <span className='text-text cursor-pointer' onClick={() => setIsHide(true)}><GrBladesVertical size={20} /></span>
                            </div>
                            <p className=' text-[13px] pb-4 text-gray-600'>Menu</p>
                            {
                                menues.map((x, i) => (
                                    <li onClick={() => handleRoutes(x.label)} className={`list-none text-[17px] flex  items-center text-text py-2 px-1 cursor-pointer hover:bg-[#e7e4e4] hover:text-btn rounded-[5px]`} key={i}>
                                        <span className='pr-2 pb-1 text-grey-800'>{x.icon(18, '')}</span>
                                        <span>  {x.label}</span>
                                    </li>
                                ))
                            }
                        </> :
                            <div className='flex flex-col items-center justify-center'>
                                <span className='py-4 cursor-pointer' onClick={() => setIsHide(false)}><GrBladesVertical size={20} /></span>
                                <span className='mt-4'>
                                    {
                                        menues.map((x, i) => (
                                            <li onClick={() => handleRoutes(x.label)} className={`list-none py-3 text-[17px] flex  items-center text-text pb-1 cursor-pointer hover:text-black`} key={i}>
                                                <span className='pr-2 pb-1'>{x.icon(18, 'grey')}</span>
                                                {/* <span>  {x.label}</span>  */}
                                            </li>
                                        ))
                                    }
                                </span>
                            </div>
                    }

                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-secondary h-16 shadow px-6 flex items-center justify-between">
                    {/* <h1 className="text-xl font-semibold text-white"></h1> */}
                    <h1 className="text-[22px] font-semibold   text-black tracking-normal">Admin Panel</h1>
                    <div className="mx-2">

                        <Popover trigger='click' className=' cursor-pointer px-4 ' placement="bottom" title={<div className='flex items-center text-[17px] gap-2 text-[grey]'><FaRegUserCircle /><span>Admin</span></div>} content={
                            <div>
                                <div className='flex justify-around items-center'>
                                    <span className={`cursor-pointer  w-full  flex justify-center transition-all duration-200  hover:text-[black] ${activeClass.light ? "bg-[#d5d2d2] text-[black]" : "bg-none text-[grey]"} hover:bg-[#d5d2d2] rounded-md p-2 text-[17px]`} onClick={() => handleTheme('light')}><MdOutlineLightMode /></span>
                                    <span className={`cursor-pointer  w-full  flex justify-center transition-all duration-200  hover:text-[black] ${activeClass.dark ? "bg-[#d5d2d2] text-[black]" : "bg-none text-[grey]"} hover:bg-[#d5d2d2] rounded-md p-2 text-[17px]`} onClick={() => handleTheme('dark')}><IoMoon /></span>

                                </div>
                                <div className='cursor-pointer gap-2 w-full flex  items-center mt-4 hover:bg-[#f6f4f4] px-2 pt-1 border-t-1 border-[lightgrey] ' >
                                    <span className='my-1'><GoSignOut /></span>
                                    <span onClick={handleLogout} className='text-[16px] my-1'>Sign out</span>
                                </div>
                            </div>
                        }>

                            <span className='bg-black border text-sm w-full h-full text-white px-4 py-3 rounded-full cursor-pointer' >A</span>

                        </Popover>

                    </div>
                </header>

                <main className="h-full p-6 overflow-auto bg-[#f1f1f3]">
                    {children}
                </main>
            </div>
        </div>


    )
}

export default page