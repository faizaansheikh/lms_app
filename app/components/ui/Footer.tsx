

'use client';

import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { useEffect, useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { SiGamedeveloper } from "react-icons/si";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { slugify } from "@/app/utility";
function Footer() {
  const router = useRouter()
  const [data, setData] = useState([])

  const getRec = () => {

    GeneralCoreService('courses').GetAll()
      .then((res) => {
        setData(res?.data)
        sessionStorage.setItem("coursesData", JSON.stringify(res.data));
      }).catch((err) => console.log(err)).finally(() => { })
  }


  const handleLinks = (flag: any) => {
    if (flag === 'terms') {
      router.push('/home/terms')
    } else if (flag === 'privacy') {
      router.push('/home/privacy')
    } else if (flag === 'about') {
      router.push(`/home/info?q=about`)
    } else if (flag === 'refund') {
      router.push(`/home/info?q=refund`)
    }

  }

  const handleCourses = (product: any) => {
    
    const slug = slugify(product?.title) || ''
    router.push(`/home/products/${slug}?q=${product._id}`)
    

  }
  useEffect(() => {
    const savedData = sessionStorage.getItem("coursesData");

    if (savedData) {
      setData(JSON.parse(savedData));
    } else {

      getRec();
    }

  }, [])
  return (
    <div id="contact">
      <div
        style={{ backgroundColor: '#122f60' }}
        className="w-full h-auto text-white py-8   flex flex-col lg:flex-row flex-wrap justify-around items-start pl-10 lg:pl-0"
      >


        <div className='w-[380px]'>
          <Image
            src='/logo.png'
            alt='logo'
            width={150}
            height={150}

          />
          {/* <p className="text-xl md:text-xl" >Chrissy Medical Academy</p> */}
          <p className="text-[14px]">The world needs more healthcare heroes. Start your journey toward becoming
            a CNA with our 100% online training. We provide the tools and confidence you
            need to pass your state exam, allowing you to begin lending a helping hand to
            patients without the stress of a traditional classroom schedule.</p>
        </div>



        <div className='w-[247px] mt-8 md:mt-8'>
          <h2 className="text-xl md:text-2xl mb-2">Health Care Programs</h2>
          <ul>
            {data?.map((x: any, i) => (
              <a key={i} className=''>
                <li
                  className={`py-1 cursor-pointer hover:underline`}
                  onClick={() => handleCourses(x)}
                >
                  {x?.title}
                </li>
              </a>

            ))}
          </ul>

        </div>

        <div className='mt-8 md:mt-8'>
          <h2 className="text-xl md:text-2xl mb-2 ">Company</h2>
          <p className="py-1 cursor-pointer hover:underline" onClick={() => handleLinks('about')}>About Us</p>
          <p className="py-1 cursor-pointer hover:underline" onClick={() => handleLinks('refund')}>Student/Refund Policy</p>
          <p className="py-1 cursor-pointer hover:underline" onClick={() => handleLinks('privacy')}>Privacy Policy</p>
          <p className="py-1 cursor-pointer hover:underline" onClick={() => handleLinks('terms')}>Terms and Conditions </p>

        </div>

        <div className='mt-8 md:mt-8'>
          <h2 className="text-xl md:text-2xl mb-2 ">Contact Us</h2>
          <h2 className="flex items-center gap-2 py-2"><span><MdOutlineSupportAgent size={28} /></span>Support <br />855-596-6891 </h2>
          <h2 className="flex items-center gap-2 py-2"><span><FaUserGraduate size={25} /></span>Admissions <br />855-596-6891 </h2>
          <h2 className="flex items-center gap-2 py-2"><span><SiGamedeveloper size={25} /></span>Workforce Development <br />855-596-6891 </h2>


        </div>

      </div>

      <div style={{ backgroundColor: '#dbebf2' }} className='w-full h-[50px] text-[#122f60] font-semibold flex justify-between px-6 md:px-22 items-center  py-10'>
        <p>
          Copyright © 2025 Chrissy Medical Academy. All Rights reserved

        </p>
        <p></p>
      </div>
    </div>
  )
}

export default Footer