import { addLineBreaks } from '@/app/utility';
import { message } from 'antd';
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import ReviewSection from '../ReviewSection';
function Btn({ title, click }: any) {
    return <button className='bg-primary px-9 py-3 text-white cursor-pointer ' onClick={click}>
        {title}
    </button>
}
function CustomProd({ desc, review, getApi }: any) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const handleEnrollment = () => {

        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            router.push(`/checkout/${Number(searchParams?.get('q'))}`)

        } else {
            message.error('You need to sign in first to enroll in this course!')
        }
    }
    return (
        <div className='bg-gray-100 w-full h-auto px-12 lg:px-62 mt-12'>
            {/* start */}
            <div className=' flex flex-col md:items-center justify-center lg:px-18 pt-20'>
                <p className='text-4xl lg:text-6xl py-4 md:text-center leading-snug'>Sterile Processing / Central <br /> Service Comprehensive Training Course</p>
                <p className='py-3'>Sat, Feb 07  |  Secaucus</p>
                <p className='text-sm font-lighter py-4 mb-2'>Sterile Processing Technician Certification Course <br />
                    Launch Your Healthcare Career in Just 8 Weeks</p>
                <Btn title='RSVP' click={handleEnrollment} />
                {/* end */}

                {/* start */}
                <div className='mt-18'>
                    <Image
                        src='/c1.jpg'
                        alt='hero'
                        width={900}
                        height={200}
                    />
                </div>
                <div className='md:mt-14 '>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: addLineBreaks(desc) }} />



                    {/* <h4 className='text-2xl pt-12 pb-3'>Time & Location</h4>
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

                    <h4 className='text-xl pt-8 pb-1'>Course Overview</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        <p className='text-2xl pt-0 pb-3'></p>
                        <p>Transform your career with our comprehensive Sterile Processing Technician program. This intensive 8-week course prepares you for immediate entry into the growing healthcare field, with no prior medical experience required.
                            <br /> Flexible Learning Options</p>
                        <li>In-Person Classes: Hudson Regional Hospital, Secaucus, NJ</li>
                        <li>Live Online Sessions: Interactive Zoom instruction</li>
                        <li>Makeup Sessions: Wednesday evenings (7:00-9:00 PM ET) for missed content</li>
                    </span>


                    <p className='mt-8'>Payment Plans Preferred Payment method Zelle 229-296-6402 or Cash-App $kruahconsultants
                        Total Course Fee: $2,250 includes Textbook and Workbook</p>
                    <p className='mt-4'>Payment Options Without Processing fee. (Zelle 229-296-6402 or Cash-App $kruahconsultants) </p>

                    <br />
                    <p>
                        Option 1: Full Payment <br />
                        $2,250 upfront Without Processing fee. (Zelle 229-296-6402 or Cash-App $kruahconsultants)
                    </p>  <br />
                    <p>
                        Option 2: Down Payment Plan <br />
                        Initial Deposit: $850 Without Processing fee. (Zelle 229-296-6402 or Cash-App $kruahconsultants)
                        followed by Weekly Installments: $280 (starting February 6, 2026) Without Processing fee. (Zelle 229-296-6402 or Cash-App $kruahconsultants)
                    </p>




                    <h4 className='text-xl pt-8 pb-2'>What's Included</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        <li>Comprehensive Textbook & Workbook</li>
                        <li>Certificate of Completion</li>
                        <li>HSPA CRCST Exam Eligibility</li>
                        <li>Flexible Learning Format</li>
                    </span>


                    <h4 className='text-xl pt-8 pb-2'>Certification & Career Prospects <br /> HSPA CRCST Certification</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        Upon course completion, you'll be eligible to take the Healthcare Sterile Processing Association (HSPA) Certified Registered Central Service Technician (CRCST) exam.
                    </span>



                    <h4 className='text-xl pt-8 pb-2'>Key Certification Details:</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        <li>Nationally Recognized across all 50 U.S. states</li>
                        <li>No Clinical Hours Required for the exam itself</li>
                        <li>Four hundred Clinical Hours must be completed within 6 months of passing the exam</li>
                        <li>Students arrange volunteer clinical hours at local medical facilities</li>
                    </span>


                    <h4 className='text-xl pt-8 pb-2'>Enrollment Requirements</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        Minimum Education: High school diploma (any country) or GED <br />
                        Experience Level: No prior medical experience necessary <br />
                        Prerequisites: High school diploma (any country) or GED
                    </span>

                    <h4 className='text-xl pt-8 pb-2'>Why Choose Our Program?</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        Accelerated Timeline: Complete your training in just 8 weeks <br />
                        Flexible Scheduling: Weekend classes accommodate working professionals <br />
                        Hybrid Format: Choose in-person or online learning <br />
                        Affordable: Competitive pricing with payment plan options <br />
                        Job-Ready: Immediate eligibility for certification exam upon completion
                    </span> */}

                    {/* <br />
                    <br />

                    <span className=' text-[15px]'>
                        Ready to Start Your Healthcare Career? <br />
                        Enrollment is Now Open for February 7, 2026 <br />
                        Don't wait – spaces are limited for this specialized program that opens doors to a stable, in-demand healthcare career. <br />
                        Contact Information
                    </span>
                    <br />
                    <br /> */}
                    <span className='text-[15px]'>
                        Ernest Kruah, CEO <br />
                        Kruah Consultants LLC <br />
                        📱 Call or Text: 229-296-6402
                    </span>

                    <h4 className='text-xl pt-8 pb-2'>Questions about the program, payment options, or enrollment? Contact us today!</h4>
                    <span className='text-[#605e5e] text-[15px]'>
                        The sterile processing field offers excellent job security and growth opportunities in hospitals, surgery centers, and medical facilities nationwide. Start your journey today!
                    </span>

                    <br />
                    <br />
                    <br />
                   
                    <Btn title='RSVP' click={handleEnrollment} />
                      <br />
                      <br />
                      <br />
                    <ReviewSection data={review} courseId={Number(searchParams?.get('q'))} getApi={getApi} />
                    <br />
                    <br />
                    <br />

                </div>

                <div className='text-center'>
                    <p className='text-2xl '>Italien Techsol LLC</p>
                    <br />
                    <p className='text-[#605e5e] leading-loose '>
                        i@italientechsollc.net <br />

                        + 1 (317) 985-1254<br />

                        Indiana, USA<br />

                        Italien Techsol LLC <br />
                    </p>


                    <div className='flex flex-col items-center justify-center gap-7 mt-8'>

                        <div className='flex gap-7'>
                            <FaFacebookF />
                            <FaInstagram />
                            <FaTwitter />
                            <FaTiktok />
                        </div>

                        <p className='text-[#605e5e]'>©2020 by 1980. Proudly created with Wix.com</p>
                        <br />
                    </div>
                </div>
                {/* end */}
            </div>
        </div>
    )
}

export default CustomProd