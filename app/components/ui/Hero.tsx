'use client'
import React, { useEffect, useState } from "react";
import XButton from "../XButton";
import { useRouter } from "next/navigation";
import { MdOutlineGamepad } from "react-icons/md";
function Hero() {
   const [user, setUser] = useState('')
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    const userLog = localStorage.getItem('user')
    if (userLog) {
      setUser(userLog)
      setIsLogged(false)
    } else {
      setIsLogged(true)
    }
  }, [])
  return (
    <>
      {isLogged ? <section
        className="relative h-125 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        {/* Dark overlay (ONLY affects image) */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Centered content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="max-w-3xl px-6 text-white flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">

              <span className="block text-secondary"> Welcome to Elite Medical Academy</span>
            </h1>

            {/* <p className="mt-4 text-lg md:text-xl text-gray-200">
            Premium artificial jewellery for everyday & bridal luxury.
          </p> */}

            <div className="mt-4">
              <XButton label='Enroll Now' />
            </div>
          </div>
        </div>
      </section> : <div className="mt-12 px-42">
        <p className="text-center text-3xl font-bold">Welcome back {user}. Let's learn something today! </p>
        <p className=" text-xl py-2 font-bold">My library</p>
        <div className="w-full h-[300px] bg-gray-200 flex flex-col gap-3 items-center justify-center">
          <span className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"><MdOutlineGamepad color="white" size={22}/></span>
          <p className="text-xl">You're not enrolled in any products</p>
        </div>
      </div>}
    </>
  );
}

export default Hero;
