'use client'
import ReviewSection from '@/app/components/ReviewSection';
import CustomProd from '@/app/components/ui/CustomProd';
import Xloader from '@/app/components/ui/Xloader';
import XButton from '@/app/components/XButton'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { useLessonContext } from '@/app/context/LessonContext';
import { addLineBreaks, slugify } from '@/app/utility';
import { message, Spin } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaFileAlt } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
interface SingleData {
    _id: number
}

function page() {
    const searchParams = useSearchParams()
    const [record, setRecord] = useState<any>({})
    const [loading, setLoading] = useState<any>(false)
    const [desc, setDesc] = useState<any>('')
    const [review, setReview] = useState<any>([])
    const router = useRouter()

    const getSingleRec = (id: number) => {
        GeneralCoreService('courses/details').GetAll(null, id)
            .then((res) => {
                if (res) {
                    const data = res?.data?.data
                    setRecord(data);
                    setReview(data?.reviews)
                    setDesc(data?.events[0]?.description);
                }

            }).catch((err) => console.log(err)).finally(() => { })
    }

    const handleCheckOut = () => {

        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            router.push(`/checkout/${Number(searchParams?.get('q'))}`)

        } else {
            message.error('You need to sign in first to enroll in this course!')
        }
    }

    useEffect(() => {
        getSingleRec(Number(searchParams?.get('q')))

    }, [])

    if (loading) {
        return <Xloader />
    }
   
    return (

        record?._id === 15 ? <CustomProd desc={desc} review={review} getApi={getSingleRec} /> :
            <>
                <section
                    className="relative h-150 w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${record?.thumbnail || "/product.jpg"})`
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Centered content */}
                    <div className="relative z-10 flex h-full items-center justify-center text-center">
                        <div className="px-6 text-white w-[700px]">
                            <h1 className="text-3xl md:text-6xl font-bold wrap-break-word">
                                <span className="text-secondary">
                                    {record?.title}
                                </span>
                            </h1>
                            <p className="text-xl md:text-3xl mt-2 wrap-break-word"> {record?.description}</p>
                            <div className="mt-4 flex justify-center">
                                <XButton Click={handleCheckOut} icon={<IoIosCart />} label={`Enroll in course for ${record?.price}$`} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 
                <div className='bg-prdimary w-full h-full mt-18  px-12 lg:px-52 '>
                  
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
                            <p className='font-bold text-xl'>{record?.author}</p>
                        </div>


                        <div className=' w-full h-full'>
                            <p className='text-md md:text-lg'>
                                Back in 2006 I was working in a dead in job that I hated. I had heard about my friend who just completed their training to become a Certified Nursing Assistant and really loved her new job. I decided to check it out and see what the career offers. After looking through the job opportunities I decided to become a CNA, but my ultimate goal was to become a Nurse.

                                On December 2nd 2006 I signed up at a local CNA Academy. It cost me $350 of my hard-earned dollars from my dead in job. I had hoped I wasn't making the wrong decision but was all in now. I enjoyed the training, I could tell this would be a rewarding job but truly I was lost. How do I sign up for the state exam? Where do I get my background check? After hours of researching and submitting my application twice I was finally for approved to take the state exam in Florida. I had two weeks to cram as much studying and practicing as I could. Nervously in February I took the state exam and passed on my first attempt!

                                Finally, I was a licensed Certified Nursing Assistant, the start of my long and rewarding career in healthcare. My first Job as a CNA was a skilled nursing facility generally caring for about 10 patients a shift. I loved it, it was a job I could be proud of. With so many options in Healthcare I was able to continue to move up the career ladder. I became a Patient Care Technician and worked in major hospitals in various units like the ICU and CVICU, while I pursued my nursing license.
                            </p>
                        </div>
                    </div>

                   
                    <div className='flex w-full h-full mt-14 md:mt-22'>
                        <div className='bg-grdeen-300 w-full h-full'>
                         


                            {
                                record?.lessons_data?.map((x: any, i: number) => (
                                    <div key={i} className='flex justify-between items-center rounded-lg p-2 bg-gray-200 my-2' >

                                        <p className='flex items-center gap-2 justify-center pl-1'><span><FaFileAlt /></span>{x?.title}</p>
                                        
                                    </div>
                                ))
                            }





                           
                        </div>
                       
                    </div>
                </div> */}


                <div className='md:my-6 bg-prdimary w-full h-full mt-0  px-12 md:px-52'>
                    <div className="prose max-w-none mb-2 px-0 md:px-16 md:mb-4  md:text-xl" dangerouslySetInnerHTML={{ __html: addLineBreaks(desc) }} />
                </div>

                <ReviewSection data={review} courseId={Number(searchParams?.get('q'))} getApi={getSingleRec} />
            </>


    )
}

export default page