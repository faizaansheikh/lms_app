'use client'
import Payment from "@/app/components/Payment";
import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { getUser } from "@/app/utility";
import { Select } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLock, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

export default function Checkout() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const [record, setRecord] = useState<any>({})
    const [userDetails, setUserDetails] = useState<any>({})
    const [installment, setInstallment] = useState<any>(null)
    const handleHome = () => router.push('/home')


    const getSingleRec = (id: any) => {
        GeneralCoreService('courses').GetAll(null, id)
            .then((res) => {
                const data = res?.data
                setRecord({ ...data, price: Number(data?.price) || null })




            }).catch((err) => console.log(err)).finally(() => { })
    }
    useEffect(() => {
        const user = getUser()
        if (params?.id) {
            setUserDetails(user)
            getSingleRec(params?.id)
        }
    }, [])

    useEffect(() => {
        if (Number(searchParams?.get('ins'))) {
            const insPrice = installment === 2 ? record.price / 2 : record.price / 4
            setRecord({ ...record, price: insPrice || null });
        }
    }, [installment])
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center p-6">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                    {/* Header */}
                    <div className="mb-6">
                        <img src="/logo.png" alt="Elite Medical Academy" className="h-20 mb-4 cursor-pointer" onClick={handleHome} />
                        <h2 className="text-xl font-semibold">Get started</h2>
                        <p className="text-sm text-gray-500">Use this account to access your purchase.</p>
                    </div>

                    {/* Logged in */}
                    <div className="border rounded-lg p-3 flex justify-between items-center mb-6">
                        <span className="text-sm">Logged in as <b>{userDetails?.email}</b></span>
                        <button className="text-sm text-red-500">Logout</button>
                    </div>

                    {/* Payment Method */}
                    <h3 className="font-semibold mb-3">Payment method</h3>
                    <div className="border rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">Card</span>
                            <div className="flex gap-2 text-xl text-gray-600">
                                <FaCcVisa />
                                <FaCcMastercard />
                                <FaCcAmex />
                                <FaCcDiscover />
                            </div>
                        </div>

                        <p className="text-sm text-blue-600 flex items-center gap-1 mb-4">
                            <FaLock /> Secure, fast checkout with Link
                        </p>


                        {record?.title === 'Sterile Processing / Central Service Comprehensive Training' && <Select
                            style={{ width: '100%', padding: '7px 7px', margin: '7px 0px' }}

                            placeholder={'Installment Plan'}
                            // defaultValue={['happy']}
                            onChange={(value) => {
                                setInstallment(value)
                                // setColVal(value);
                            }}
                            options={[
                                { label: '2 Installments', value: 2 },
                                { label: '4 Installments', value: 4 },
                            ]}

                        />}
                        <Payment amount={record?.price} />
                    </div>


                </div>

                {/* Right Section - Order Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-semibold mb-4">Order summary</h3>

                    <div className="flex gap-3 mb-4">
                        <img
                            src={record?.thumbnail}
                            alt="Course"
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{record?.title}</p>
                            <p className="text-sm font-semibold mt-1">{record?.price}</p>
                        </div>
                    </div>

                    {/* <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Coupon code"
                            className="flex-1 border rounded-md px-3 py-2"
                        />
                        <button className="px-4 bg-gray-200 rounded-md text-sm">Apply</button>
                    </div> */}

                    <div className="flex justify-between font-semibold border-t pt-4  ">
                        <span>Total</span>
                        <span>USD {record?.price}</span>
                    </div>
                </div>
            </div>
        </div>

    );
}
