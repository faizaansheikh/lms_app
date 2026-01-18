

'use client';

import { GeneralCoreService } from "@/app/config/GeneralCoreService";
import { useEffect, useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { SiGamedeveloper } from "react-icons/si";
import Image from "next/image";
function Footer() {
  const [data, setData] = useState([])
 
  const getRec = () => {

    GeneralCoreService('courses').GetAll()
      .then((res) => {
        setData(res?.data)
      }).catch((err) => console.log(err)).finally(() => { })
  }



  useEffect(() => {
    getRec()

  }, [])
  return (
    <div>
      <div
        style={{ backgroundColor: '#122f60' }}
        className="w-full h-auto text-white py-12   flex flex-col md:flex-row flex-wrap justify-around items-start pl-12 md:pl-0"
      >
        {/* <div className="w-full flex flex-wrap"> */}
        {/* Left Side: Contact Info */}
        {/* flex-grow md:flex-[2] w-full md:w-1/3 pl-4 md:pl-0 */}
        {/* <div className="flex flex-row justify-start items-center text-white py-12 
                        
                          "> */}



        <div className=''>
          <Image
            src='/logo.png'
            alt='logo'
            width={150}
            height={150}

          />
          <p className="text-xl md:text-2xl" >Chrissy Medical Academy</p>
        </div>



        <div className='w-[247px] mt-8 md:mt-0'>
          <h2 className="text-xl md:text-2xl mb-2">Health Care Programs</h2>
          <ul>
            {data?.map((x: any, i) => (
              <a key={i} className=''>
                <li
                  className={`py-1`}
                // onClick={() => handleLinks(x)}
                >
                  {x?.title}
                </li>
              </a>

            ))}
          </ul>

        </div>

        <div className='mt-8 md:mt-0'>
          <h2 className="text-xl md:text-2xl mb-2 ">Company</h2>
          <p className="py-1">About Us</p>
          <p className="py-1">Blog</p>
          <p className="py-1">Refer and Earn</p>
          <p className="py-1">State Restrictions</p>
          <p className="py-1">Student/Refund Policy</p>
          <p className="py-1">Privacy Policy</p>
          <p className="py-1">Terms and Conditions </p>

        </div>

        <div className='mt-8 md:mt-0'>
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