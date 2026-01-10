import Image from 'next/image'
import React from 'react'
function Btn({ title }: any) {
    return <button className='bg-primary px-9 py-3 text-white cursor-pointer '>
        {title}
    </button>
}
function CustomProd() {
    return (
        <div className='bg-gray-100 w-full h-auto px-12 lg:px-62 '>
            {/* start */}
            <div className=' flex flex-col items-center justify-center lg:px-18 pt-20'>
                <p className='text-4xl lg:text-6xl py-4 text-center leading-snug'>Sterile Processing / Central <br /> Service Comprehensive Training Course</p>
                <p className='py-3'>Sat, Feb 07  |  Secaucus</p>
                <p className='text-sm font-lighter py-4'>Sterile Processing Technician Certification Course <br />
                    Launch Your Healthcare Career in Just 8 Weeks</p>
                <Btn title='RSVP' />
                {/* end */}

                {/* start */}
                <div className='mt-14'>
                    <Image
                        src='/hero.jpg'
                        alt='hero'
                        width={800}
                        height={200}
                    />


                    <h4 className='text-2xl pt-12 pb-3'>Time & Location</h4>
                    <span className='text-[#605e5e]'>
                        <p>Feb 07, 2026, 8:00 AM – Mar 28, 2026, 2:30 PM <br /> Secaucus, 55 Meadowlands Pkwy, Secaucus, NJ 07094, USA</p>
                    </span>

                    <h4 className='text-2xl pt-12 pb-1'>About the event</h4>
                    <span className='text-[#232323] text-[15px]'>
                        <p className='text-2xl pt-0 pb-3'></p>
                        <p>Sterile Processing Technician Certification Course</p>
                        <p>Launch Your Healthcare Career in Just 8 Weeks</p>
                        <p>Start Date: February 7, 2026</p>
                        <p>End Date: March 28, 2026</p>
                        <p>Schedule: Saturdays, 8:00 AM - 2:30 PM ET</p>
                        <p>Format: Hybrid - In-Person & Live Online Options Available (Zoom)</p>
                    </span>


                </div>
                {/* end */}
            </div>
        </div>
    )
}

export default CustomProd