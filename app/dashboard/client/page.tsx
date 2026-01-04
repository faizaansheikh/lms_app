'use client'
import Courses from "@/app/components/ui/Courses";
import { MdOutlineGamepad } from "react-icons/md";
function page() {
    return (
        <>
            <div className="mt-12 px-42">
                <p className="text-center text-3xl font-bold">Welcome back {'user'}. Let's learn something today! </p>
                <p className=" text-xl py-2 font-bold">My library</p>
                <div className="w-full h-[300px] bg-gray-200 flex flex-col gap-3 items-center justify-center">
                    <span className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"><MdOutlineGamepad color="white" size={22} /></span>
                    <p className="text-xl">You're not enrolled in any products</p>
                </div>
            </div>
            <Courses />
        </>
    )
}

export default page