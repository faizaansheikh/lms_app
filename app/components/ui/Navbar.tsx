'use client'
import React, { useEffect, useState } from 'react'
import XButton from '../XButton'
import { useRouter } from 'next/navigation'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
function Navbar() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState('')
  const [userrole, setUserRole] = useState('')
  const handleLogin = () => router.push('/auth/login')
  const handleSignup = () => router.push('/auth/signup')
  const handleHome = () => router.push('/home')
  const handleBrowse = () => router.push('/home/products')
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    window.location.reload()

  }
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      const token = localStorage.getItem('token');

      if (token && userInfo) {
        const user = JSON.parse(userInfo);
        setUsername(user?.name || '');
        setUserRole(user?.role || '');

        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      console.error('Invalid localStorage data', error);
      setIsLogged(false);
    }
  }, []);

  return (
    <div className='bg-white w-full h-16 flex justify-between px-32 items-center shadow-md'>
      <div onClick={handleHome} className='cursor-pointer text-2xl'>Logo</div>
      <div className='flex items-center gap-2'>
        {isLogged && userrole === 'student' ?
          <>
            <span className='text-primary text-lg px-0 cursor-pointer' onClick={handleBrowse}>Browse Products</span>
            <span className='text-xl px-3'>{username}</span>
            <Popover content={<div className='text-lg '>
              <p className='p-1 cursor-pointer hover:bg-gray-200'>Edit profile</p>
              <p onClick={handleLogout} className='p-1 cursor-pointer hover:bg-gray-200'>Logout</p>
            </div>} title="" trigger="click" placement='bottom'>
              <Avatar className='cursor-pointer' size="large" icon={<UserOutlined />} />
            </Popover>

          </>

          :
          <>
            <span onClick={handleLogin} className='text-primary cursor-pointer h-15 w-auto px-4 flex items-center  hover:bg-[#e9e5e5] duration-200'>Login</span>
            <XButton Click={handleSignup} label='Sign up' />
          </>
        }
      </div>
    </div>
  )
}

export default Navbar