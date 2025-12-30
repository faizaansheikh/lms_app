
'use client'
import { FaRegCircle } from "react-icons/fa";
import React from 'react'
import { FaFileAlt } from "react-icons/fa";
import { PiVideoBold } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { slugify } from "@/app/utility";
function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter()
    const arr = [
        {
            head: 'Introduction',
            videos: [
                {
                    title: 'Welcome',
                    icon: <FaFileAlt size={18} className="text-[#3c3b3b]" />
                }
            ]
        },
        {
            head: 'First Aide Video',
            videos: [
                {
                    title: 'First Aide Video #1 (56:37)',
                    icon: <PiVideoBold size={22} className="text-[#3c3b3b]" />
                },
                {
                    title: 'First Aide Video #2 (64:15)',
                    icon: <PiVideoBold size={22} className="text-[#3c3b3b]" />
                }
            ]
        },
        {
            head: 'Final Exam',
            videos: [
                {
                    title: 'Final Exam',
                    icon: <FaFileAlt size={18} className="text-[#3c3b3b]" />
                },

            ]
        }
    ]

    const handleLinks = (title: string) => {
       
        const slug = slugify(title)
        router.push(`/course/lecture?q=${slug}`)
    }

    const handleHome = () => router.back()
    return (
        <div className='flex'>
            <div className='bg-rded-300 w-[25%] h-screen border-r border-gray-400'>
                <div className='h-20 flex items-center pl-4 border-b border-gray-400 cursor-pointer' onClick={handleHome}><p><IoHome className="text-primary" size={20} /></p></div>
                {
                    arr.map((x, i) => (
                        <div className='mt-4' key={i}>
                            <p className='font-bold text-lg p-3'>{x.head}</p>
                            {x.videos.map((v, ind) => (
                                <li onClick={() => handleLinks(v.title)} className='list-none p-4 border-t border-b border-gray-400 flex items-center gap-3 text-sm cursor-pointer hover:bg-red-300' key={ind}>
                                    <span className=''><FaRegCircle size={20} className="text-primary mr-2" /></span>
                                    <span className=''>{v.icon}</span>
                                    {v.title}
                                </li>
                            ))}

                        </div>
                    ))
                }

            </div>

            <div className='w-full h-screen'>
                <div className='bg-redd-300 w-full h-20 border-b border-gray-400 '></div>
                {/* content */}
                <div className=' w-full  p-4'>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default layout