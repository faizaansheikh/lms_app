'use client'
import Courses from "@/app/components/ui/Courses";
import Xloader from "@/app/components/ui/Xloader";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { getUser, slugify } from "@/app/utility";
import { Col, ConfigProvider, message, Row, Spin, Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineGamepad } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa6";
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

    const handleCertificate = (x: any) => {
        
        const userInfo = getUser()
        if (userInfo) {

          
            let payload = {
                user_id: userInfo?.id,
                course_id: x?._id,
            }
            GeneralCoreService('certificate/confirm').Save(payload)
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Certificate sent to you email address!')
                    } else {
                        message.error(res?.message || "Error sending certificate!")
                    }


                }).catch((err) => console.log(err)).finally(() => { })
        } else {
            message.error('You need to sign in first to enroll in this course!')
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
                <div
                    className={`w-full p-6 bg-gray-200 ${data?.length ? "h-auto" : "h-[300px] flex flex-col justify-center items-center"
                        }`}
                >
                    {loader ? (
                        <Spin size="large" />
                    ) : data?.length ? (
                        <Row gutter={[16, 16]}>
                            {data.map((x: any, i) => (
                                <Col key={i} xs={24} sm={24} md={12} lg={12}>
                                    <div className="flex flex-col sm:flex-row w-full min-h-[140px] bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

                                        {/* Image */}
                                        <div className="w-full sm:w-[120px] h-[160px] sm:h-auto overflow-hidden">
                                            <Image
                                                src={x?.thumbnail ?? "/noimg.png"}
                                                alt=""
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col justify-between p-4 flex-1">
                                            <p className="text-base font-semibold text-gray-800 line-clamp-2">
                                                {x?.title}
                                            </p>

                                            <div className="flex justify-between items-center gap-2 mt-3">
                                                <div
                                                    onClick={
                                                        x?.payment !== "100% Complete"
                                                            ? () => handleRemainingPayment(x)
                                                            : undefined
                                                    }
                                                    className={`px-4 py-2 text-xs rounded-full font-medium ${x?.payment === "100% Complete"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer"
                                                        }`}
                                                >
                                                    Payment {x?.payment ?? "Pending"}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {x.status === 'Completed' &&
                                                        <ConfigProvider
                                                            tooltip={{
                                                                unique: true,
                                                            }}
                                                        >
                                                            <Tooltip title="Request for certificate!" placement={'bottom'}>
                                                                <span
                                                                    onClick={() => handleCertificate(x)}
                                                                    className="w-10 h-10 flex  items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-transform hover:scale-105"
                                                                >
                                                                    <FaCertificate size={16} />
                                                                </span>
                                                            </Tooltip>

                                                        </ConfigProvider>
                                                    }
                                                    <div
                                                        onClick={() => handleCourse(x)}
                                                        className="w-10 h-10 flex  items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-transform hover:scale-105"
                                                    >
                                                        <FaBookOpen size={16} />

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <>
                            <span className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                                <MdOutlineGamepad color="white" size={22} />
                            </span>
                            <p className="text-xl mt-2">You're not enrolled in any course</p>
                        </>
                    )}
                </div>



            </div>
            <Courses />
        </>
    )
}

export default page