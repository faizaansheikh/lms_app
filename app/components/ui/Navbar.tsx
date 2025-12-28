'use client'
import React from 'react'
import XButton from '../XButton'
import { useRouter } from 'next/navigation'

function Navbar() {
  const router = useRouter()
  const handleLogin = () => router.push('/auth/login')
  const handleSignup = () => router.push('/auth/signup')
  const handleHome = () => router.push('/home')
  return (
    <div className='bg-white w-full h-16 flex justify-between px-32 items-center shadow-md'>
      <div onClick={handleHome} className='cursor-pointer text-2xl'>Logo</div>
      <div className='flex items-center gap-2'>
        <span onClick={handleLogin} className='text-primary cursor-pointer h-15 w-auto px-4 flex items-center  hover:bg-[#e9e5e5] duration-200'>Login</span>
        <XButton Click={handleSignup} label='Sign up' />
      </div>
    </div>
  )
}

export default Navbar