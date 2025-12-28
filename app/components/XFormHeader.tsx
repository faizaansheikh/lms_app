import React from 'react'
import XButton from './XButton'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from "react-icons/io5";
interface formHeader {
    title: string;
}
function XFormHeader(props: formHeader) {
    const { title } = props
    const router = useRouter()

    const showLabel = () => {
        return 'Save Changes'
    }
    return (

        <div className=' w-full  flex justify-between items-center   bg-[]  bg-secondary rounded-xl p-4 my-4 z-200'>
            <div className='flex gap-2 items-center justify-center'>

                <span
                    onClick={() => router.back()}
                    className="border border-black rounded-3xl p-1 cursor-pointer relative right-0 hover:right-1 transition-all duration-300 ease-in-out"
                >
                    <IoArrowBack size={22} />
                </span>

                <span className='text-3xl  ml-2'>{title}</span>
            </div>
            <div className='flex items-center gap-4'>

                <span><XButton label={'Cancel'} icon={false} type='transparent' Click={() => { }} /></span>
                <span><XButton label={showLabel()} icon={false} type='' btntype="submit" /></span>




            </div>




        </div>
    )
}

export default XFormHeader