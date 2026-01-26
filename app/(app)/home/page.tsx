'use client'

import { getAuthToken } from "@/app/components/authToken";
import BlogSection from "@/app/components/ui/BlogSection";
import Courses from "@/app/components/ui/Courses";
import Hero from "@/app/components/ui/Hero";
import { useEffect } from "react";

export default function Page() {
  const getToken = async () => {
    const token = await getAuthToken();
    if (!token) {
      localStorage.removeItem('userInfo')
    }
  }
  useEffect(() => {
    getToken()
  }, [])
  return (
    <div className="">

      <Hero />
      <Courses />
      {/* <BlogSection/> */}

    </div>
  );
}
