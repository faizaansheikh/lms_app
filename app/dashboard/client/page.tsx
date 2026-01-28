'use client'
import Courses from "@/app/components/ui/Courses";
import Xloader from "@/app/components/ui/Xloader";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { getUser, slugify } from "@/app/utility";
import { Col, Row, Spin } from "antd";
import Image from "next/image";
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
            GeneralCoreService('enrollment/courses').GetAll(null, user?.id)
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
    const handleRemainingPayment = (product: any) => {
        const paidPercent = product?.payment && product?.payment.includes("%")
            ? parseInt(product?.payment.split("%")[0]) : 0
        router.push(`/checkout/${product._id}?p=${paidPercent}`)
    }
    useEffect(() => {
        getUserCourses()
    }, [])
    return (
        <>
            <div className="mt-12 px-14 md:px-42">

                <p className="text-center text-2xl md:text-3xl font-bold">Welcome back {userInfo?.name}. Let's learn something today! </p>
                <p className=" text-xl py-2 mt-4 font-bold">My library</p>
                <div className={`w-full ${data?.length ? "h-auto" : "h-[300px]"} p-6 bg-gray-200 flex flex-wrap ${data?.length ? "flex-row" : "flex-col justify-center"} gap-3 items-center `}>
                    {
                        loader ? <Spin size="large" />

                            : data?.length ?
                                data?.map((x: any, i) => (

                                    <Row key={i} justify="start" className="mb-4">
                                        <Col xs={24} lg={24}>
                                            <div
                                                className="flex flex-col sm:flex-row w-full max-w-[400px] h-auto sm:h-[120px] bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden "

                                            >
                                                {/* Course Thumbnail */}
                                                <div className="flex-shrink-0 w-full sm:w-[120px] h-[120px] sm:h-full overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                                                    <Image
                                                        alt={`Course thumbnail ${i}`}
                                                        src={x?.thumbnail ?? "/noimg.png"}
                                                        width={120}
                                                        height={120}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                {/* Course Info */}
                                                <div className="flex flex-col justify-between p-4 flex-1 gap-2">
                                                    {/* Course Title */}
                                                    <p className="text-md font-semibold text-gray-800 ">{x?.title}</p>

                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {/* Payment Status */}
                                                        <span
                                                            onClick={x?.payment !== "100% Complete" ? () => handleRemainingPayment(x) : undefined}
                                                            className={`
                inline-block px-3 py-1 text-sm text-center rounded-full font-medium
                ${x?.payment === "100% Complete" ? "bg-green-100 text-green-800" : ""}
                ${x?.payment?.includes("%") && x?.payment !== "100% Complete" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer" : ""}
              `}
                                                        >
                                                            {x?.payment ?? "Pending"}
                                                        </span>

                                                        {/* Open Lectures Button */}
                                                        <span
                                                            onClick={() => handleCourse(x)}

                                                            className="
                bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-transform duration-300 hover:scale-105
              "
                                                        >
                                                            Open Lectures
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


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