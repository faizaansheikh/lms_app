'use client'
import Courses from "@/app/components/ui/Courses";
import Xloader from "@/app/components/ui/Xloader";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { getUser, slugify } from "@/app/utility";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineGamepad } from "react-icons/md";
function page() {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const [userInfo, setUserInfo] = useState<any>({})
    const getUserCourses = () => {
        const user = getUser()
        if (user) {
            setLoader(true)
            setUserInfo(user)
            GeneralCoreService('enrollment/courses').GetAll(user?.id)
                .then((res) => {
                    if (res?.data) {
                        setData(res?.data)
                    }


                }).catch((err) => console.log('err', err))
                .finally(() => setLoader(false))
        }

    }

    const handleCourse = (product: any) => {
        router.push(`/course/lectures?q=${product._id}`)
    }

    useEffect(() => {
        getUserCourses()
    }, [])
    return (
        <>
            <div className="mt-12 px-42">

                <p className="text-center text-3xl font-bold">Welcome back {userInfo?.name}. Let's learn something today! </p>
                <p className=" text-xl py-2 font-bold">My library</p>
                <div className={`w-full ${data?.length ? "h-auto" : "h-[300px]"} p-6 bg-gray-200 flex ${data?.length ? "flex-row" : "flex-col"} gap-3 items-center justify-center`}>
                    {
                        loader ? <Spin size="large" />

                            : data?.length ?
                                data?.map((x: any, i) => (

                                    <div key={i} onClick={() => handleCourse(x)} className="bg-[whitesmoke] w-full h-[200px] flex items-center justify-center cursor-pointer hover:shadow border hover:border-[red]  hover:bg-white rounded-lg">

                                        <p className="text-xl">{x?.title}</p>
                                    </div>

                                ))
                                : <>
                                    <span className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"><MdOutlineGamepad color="white" size={22} /></span>
                                    <p className="text-xl">You're not enrolled in any course</p>
                                </>}
                </div>


            </div>
            <Courses />
        </>
    )
}

export default page