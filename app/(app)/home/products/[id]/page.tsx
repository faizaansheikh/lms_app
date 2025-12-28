'use client'
import XButton from '@/app/components/XButton'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosCart } from "react-icons/io";
function page() {
    const [productName, setProductName] = useState<any>('')
    const pathname = usePathname();

    console.log(pathname?.split('/').pop());
    useEffect(() => {
        if (pathname) {
           
        }

    }, [])
    return (
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
                        <XButton icon={<IoIosCart/>} label="Enroll in course for $60" />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default page