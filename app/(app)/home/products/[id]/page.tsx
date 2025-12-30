'use client'
import XButton from '@/app/components/XButton'
import { slugify } from '@/app/utility';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaFileAlt } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
function page() {
    const [productName, setProductName] = useState<any>('')
    const pathname = usePathname();
    const router = useRouter()
    const handleVideoClick = (title: string) => {
        const slug = slugify(title) || ''
        router.push(`/course/lecture?q=${slug}`)
    }
    const arr = [
        {
            head: 'Introduction',
            videos: [
                {
                    title: 'Welcome'
                }
            ]
        },
        {
            head: 'First Aide Video',
            videos: [
                {
                    title: 'First Aide Video #1 (56:37)',
                },
                {
                    title: 'First Aide Video #2 (64:15)',
                }
            ]
        },
        {
            head: 'Final Exam',
            videos: [
                {
                    title: 'Final Exam',
                },

            ]
        }
    ]
    // useEffect(() => {
    //     if (pathname) {

    //     }

    // }, [])
    return (
        <>
            <section
                className="relative h-125 w-full bg-cover bg-center"
                style={{ backgroundImage: "url('/product.jpg')" }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Centered content */}
                <div className="relative z-10 flex h-full items-center justify-center text-center">
                    <div className="px-6 text-white w-[700px]">
                        <h1 className="text-3xl md:text-6xl font-bold wrap-break-word">
                            <span className="text-secondary">
                                Online 2 Hour Med Tech Class Renewal
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl mt-2 wrap-break-word">Featured Courses Online 2 Hour Med Tech Class Renewal</p>
                        <div className="mt-4 flex justify-center">
                            <XButton icon={<IoIosCart />} label="Enroll in course for $60" />
                        </div>
                    </div>
                </div>
            </section>


            <div className='bg-prdimary w-full h-full mt-18  px-12 lg:px-52 '>
                {/* instructor */}
                <p className='text-3xl'>Your Course Instructor</p>
                <div className='flex gap-6 md:gap-12 w-full h-full mt-6 mb-6 flex-wrap md:flex-nowrap'>

                    <div className='flex flex-col items-center gap-5'>
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-50 md:h-50 rounded-full overflow-hidden ">
                            <Image
                                src="/hero.jpg"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className='font-bold text-xl'>Brandon Marcum</p>
                    </div>


                    <div className=' w-full h-full'>
                        <p className='text-md md:text-lg'>
                            Back in 2006 I was working in a dead in job that I hated. I had heard about my friend who just completed their training to become a Certified Nursing Assistant and really loved her new job. I decided to check it out and see what the career offers. After looking through the job opportunities I decided to become a CNA, but my ultimate goal was to become a Nurse.

                            On December 2nd 2006 I signed up at a local CNA Academy. It cost me $350 of my hard-earned dollars from my dead in job. I had hoped I wasn't making the wrong decision but was all in now. I enjoyed the training, I could tell this would be a rewarding job but truly I was lost. How do I sign up for the state exam? Where do I get my background check? After hours of researching and submitting my application twice I was finally for approved to take the state exam in Florida. I had two weeks to cram as much studying and practicing as I could. Nervously in February I took the state exam and passed on my first attempt!

                            Finally, I was a licensed Certified Nursing Assistant, the start of my long and rewarding career in healthcare. My first Job as a CNA was a skilled nursing facility generally caring for about 10 patients a shift. I loved it, it was a job I could be proud of. With so many options in Healthcare I was able to continue to move up the career ladder. I became a Patient Care Technician and worked in major hospitals in various units like the ICU and CVICU, while I pursued my nursing license.
                        </p>
                    </div>
                </div>

                {/* curriculam */}
                <div className='flex w-full h-full mt-14 md:mt-22'>
                    <div className='bg-grdeen-300 w-full h-full'>
                        <p className='text-3xl'> Course Curriculum</p>

                        {arr.map((x, i) => (
                            <div className=' w-full h-full my-4 text-sm md:text-[16px]' key={i}>
                                <div className='bg-gray-300 w-full p-4 font-bold rounded-t-lg'>{x.head}</div>
                                {x?.videos?.map((v, ind) => (
                                    <div onClick={() => handleVideoClick(v?.title)} className='flex justify-between items-center rounded-b-lg p-2 bg-gray-200 cursor-pointer hover:bg-red-200' key={ind}>

                                        <p className='flex items-center gap-2 justify-center pl-1'><span><FaFileAlt /></span>{v.title}</p>
                                        <button className='bg-red-400 px-4 py-1 text-white rounded-lg cursor-pointer'>Start</button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* <div className='bg-green-600 w-full h-full'></div> */}
                </div>
            </div>
        </>

    )
}

export default page