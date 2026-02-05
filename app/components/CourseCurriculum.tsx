"use client";

import { FiFileText } from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUser } from "../utility";
import { useRouter, useSearchParams } from "next/navigation";



export default function CourseCurriculum({ data }: any) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleStart = () => {
    const user = getUser()
    if (user) {
      router.push(`/checkout/${Number(searchParams?.get('q'))}`)

    } else {
      router.push(`/auth/signup`)
    }
  }
 
  return (
    <div className="w-full  lg:px-62 p-6 mx-auto ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Course Curriculum
      </h2>

      <div className="space-y-3">

        {data?.map((lesson: any, j: number) => (
          <div
            key={j}
            className="flex items-center justify-between px-4 py-3 border border-2 shadow border-gray-600 rounded-md"
          >
            <div className="flex items-center gap-3 text-gray-700 text-md">
              {lesson.url ? (
                <FaPlayCircle className="text-gray-500" size={20} color="red" />
              ) : (
                <FiFileText className="text-gray-500" size={20} color="red" />
              )}

              <span>
                {lesson.title}
                {lesson.duration && (
                  <span className="text-gray-500 ml-1">
                    ({lesson.duration})
                  </span>
                )}
              </span>
            </div>

            <button onClick={handleStart} className={`bg-red-600 hover:bg-red-700 cursor-pointer text-white text-xs px-4 py-1.5 rounded`}>
              Start
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
