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
        <div className='bg-gray-100 w-full h-auto  mt-12'>
            {/* start */}
            <div className=' flex flex-col md:items-center justify-center pt-20 px-12 lg:px-62'>
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
                <div className=' '>
                    <div className="bg-primdary w-full mt-12  md:mt-22 mb-12  text-md">
                        <div
                            className="
      prose max-w-full
    whitespace-pre-line break-words
      font-sans

      prose-p:font-sans
      prose-li:font-sans
       prose-li:my-2  
      prose-strong:font-sans
      prose-em:font-sans
      prose-pre:font-sans
      prose-code:font-sans
    "
                            dangerouslySetInnerHTML={{ __html: desc }}
                        />
                    </div>

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

                    <br />


                </div>
                <ReviewSection data={review} courseId={Number(searchParams?.get('q'))} getApi={getApi} ui={true} />

                <div className='text-center mt-22'>
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