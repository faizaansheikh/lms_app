import React, { useState } from 'react';
import StartQuizConfirmation from './StartQuizConfirmation';
import { IoChevronBackSharp } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { GoCircle } from "react-icons/go";
import { GrLinkNext } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { message } from 'antd';
import CustomModal from '../CustomModal';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUser } from '@/app/utility';
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
const Quiz = ({ data, setShowQuiz }: any) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [active, setActive] = useState(null)
    const [disableSave, setDisableSave] = useState(true)
    const [disableNext, setDisableNext] = useState(true)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [answer, setAnswer] = useState<any>({})
    const [percentage, setPercentage] = useState<any>(null)
    const [result, setResult] = useState<any>([])
    const [index, setIndex] = useState(0)



    const handleEnrollment = () => {

        const userInfo = getUser()
        if (userInfo) {

            const coursId = Number(searchParams?.get('q')) || null
            let payload = {
                user_id: userInfo?.id,
                course_id: coursId,
                status: 'Completed'
            }
            GeneralCoreService('enrollment/update').Save(payload)
                .then((res) => {



                }).catch((err) => console.log(err)).finally(() => { })
        } else {
            message.error('You need to sign in first to enroll in this course!')
        }
    }
    const handleCertificate = () => {

        const userInfo = getUser()
        if (userInfo) {

            const coursId = Number(searchParams?.get('q')) || null
            let payload = {
                user_id: userInfo?.id,
                course_id: coursId,
            }
            GeneralCoreService('certificate/confirm').Save(payload)
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Certificate sent to you email address!')
                    }else{
                        message.error(res?.message || "Error sending certificate!")
                    }


                }).catch((err) => console.log(err)).finally(() => { })
        } else {
            message.error('You need to sign in first to enroll in this course!')
        }
    }

    const handleOption = (x: any) => {
        setDisableSave(false)
        setActive(x?.Name)

        setAnswer({
            questionId: data?.questions[index]?._id,
            selectedOption: x?.Correct
        })
    }
    const handleNext = () => {
        setDisableSave(true)
        setDisableNext(true)
        setIndex(index + 1)
    }
    const handleSubmit = () => {
        const correctCount = result?.filter((ans: any) => ans?.selectedOption === 'Correct').length;

        // Total questions
        const totalQuestions = data?.questions?.length || []

        // Calculate percentage
        const percentage = (correctCount / totalQuestions) * 100;
        setPercentage(percentage)
        setOpenModal(true)

    }

    const handleSave = () => {
        setDisableSubmit(false)
        setDisableNext(false)

        setResult((prev: any) => {
            // Remove any existing answer for the same question
            const filtered = prev.filter((a: any) => a.questionId !== answer.questionId);
            // Add the new answer
            return [...filtered, answer];
        });


    }

    const handleModalSave = () => {
        setOpenModal(false)
        handleCertificate()
        handleEnrollment()
        router.back()
    }


    return (
        <>

            <CustomModal okText='Add' open={openModal} setOpen={setOpenModal} title={'Confirmation'}
                extraBtn={
                    <>
                        {
                            percentage >= 60 ? <button
                                onClick={handleModalSave}
                                type="button"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                            >
                                Request for certification
                            </button> :
                                <button
                                    onClick={() => router.back()}
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                >
                                    Back to home
                                </button>
                        }

                    </>
                }
                content={
                    <>
                        <div className='flex flex-col justify-center items-center'>
                            <Image
                                alt='img'
                                src={percentage >= 60 ? '/congrats.png' : '/fail.png'}
                                width={250}
                                height={250}
                            />
                            {
                                percentage >= 60 ? <div className='text-center text-xl my-3'>
                                    <p><span className='font-semibold'>Congratulations!</span> You passed the final exam.</p>
                                    <p>{`You scored ${percentage} out of ${data?.questions?.length || ''} (${Math.round(percentage)}%). Keep up the good work!`}</p>
                                </div> :

                                    <div className='text-center text-xl my-3'>
                                        <p>Unfortunately, you did not pass this time.</p>
                                        <p>{`You scored ${percentage} out of ${data?.questions?.length || ''} (${Math.round(percentage)}%). Review the material and try again to improve your score`}</p>
                                    </div>
                            }

                        </div>
                    </>
                } />


            <StartQuizConfirmation quizName={data?.name} onStart={() => { }} setShowQuiz={setShowQuiz} />
            <div className='w-full h-[100vh] bg-[#FAF3F0] px-8 md:px-32 flex flex-col '>
                <h1 className="text-xl md:text-3xl font-bold mb-1 text-center pt-8">Final Exam</h1>
                <div>
                    <div className='flex justify-between items-center h-[60px] border-b-3 border-[#7E30E1] '>
                        <div className='flex items-center  gap-3'>
                            <IoChevronBackSharp />
                            <p className='text-xl md:text-2xl font-semibold'>{data?.name} Quiz</p>
                        </div>
                        <div className='flex items-center gap-2'><span><LuClock color='#7E30E1' /></span>2:00</div>
                    </div>

                    <p className='text-[#6C48C5] py-4 text-xl'>Questions {index + 1} of {data?.questions?.length}</p>
                    <p className='font-semibold text-lg md:text-xl pb-6'>{data?.questions[index]?.question}</p>


                    {
                        data?.questions[index]?.answers?.map((x: any, i: any) => (
                            <div
                                key={i}
                                onClick={() => handleOption(x)}
                                className={`flex justify-between px-6 items-center w-full h-[60px]  rounded-lg  mb-5 transition-all duration-300 cursor-pointer ${active === x?.Name ? 'bg-[#F8E7F6] border-[#7E30E1]' : 'bg-[whitesmoke] border-[gray]'} border-1   hover:bg-gray-300 hover:border-[#7E30E1]`}>
                                <p className='font-semibold text-md md:text-lg'>{x?.Name}</p>
                                {active === x?.Name ? <TiTick size={25} color='white' className='bg-[#7E30E1] rounded-full' /> : <p><GoCircle size={25} /></p>}
                            </div>
                        ))
                    }


                </div>

                <div className='text-end mt-5 flex justify-end'>
                    {
                        index === data?.questions?.length - 1 ?
                            <>
                                <button
                                    onClick={handleSubmit}
                                    disabled={disableSubmit}
                                    className={`px-4 text-md md:text-xl py-3 ${disableSubmit ? 'bg-[gray]' : 'bg-black cursor-pointer hover:bg-gray-800'} text-white rounded-lg mb-6 flex items-center justify-center gap-3 transition-all duration-300`}>
                                    Submit
                                </button>

                            </>
                            :
                            <>
                                <button
                                    onClick={handleNext}
                                    disabled={disableNext}
                                    className={`px-4 text-md md:text-xl py-3 ${disableNext ? 'bg-[gray]' : 'bg-black cursor-pointer hover:bg-gray-800'} text-white rounded-lg mb-6 flex items-center justify-center gap-3 transition-all duration-300  `}>
                                    Next <span><GrLinkNext color='white' /></span>
                                </button>

                            </>
                    }
                    <button
                        onClick={handleSave}
                        disabled={disableSave}
                        className={`px-4 ml-3 text-md md:text-xl py-3 ${disableSave ? 'bg-[gray]' : 'bg-[green] cursor-pointer hover:bg-green-800'} text-white rounded-lg mb-6 flex items-center justify-center gap-3 transition-all duration-300 `}>
                        Save
                    </button>

                </div>
            </div>
        </>
    );
};

export default Quiz;