'use client';

import React, { useEffect, useState } from "react";
import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Drawer, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserOutlined } from '@ant-design/icons';
import { removeAuthToken } from "../authToken";
import XButton from "../XButton";
import Link from "next/link";
const Nav = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('')
    const [userrole, setUserRole] = useState('')
    const handleLogin = () => router.push('/auth/login')
    const handleSignup = () => router.push('/auth/signup')
    const handleHome = () => router.push('/home')
    const handleBrowse = () => router.push('/home/products')
    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        removeAuthToken()
        router.push('/home')

    }
    useEffect(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const user = JSON.parse(userInfo);
                setUsername(user?.name || '');
                setUserRole(user?.role || '');
            }
        } catch (error) {
            console.error('Invalid localStorage data', error);
        }
    }, []);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

 
    

    const menu = [
        { title: 'Home', link: '#home' },
        { title: 'Programs', link: '#programs' },
        { title: 'Blogs', link: '#blogs' },
        { title: 'Contact Us', link: '#contact' }
    ];

   
    return (
        <>
            <div
                className={`fixed top-0 left-0 right-0 z-[2000]  flex justify-between items-center px-4 transition-all duration-300 px-4 lg:px-32 
                    }`}
                style={{ backgroundColor: 'white' }}
            >
                <div onClick={handleHome} className='cursor-pointer text-2xl'>
                    <Image
                        src='/logo.png'
                        alt='logo'
                        width={100}
                        height={100}

                    />
                </div>

                <ul className="hidden md:flex items-center justify-center" >
                    {menu.map((x, i) => (
                        <Link href={x.link} key={i}>
                            <li
                                className={`list-none px-4 text-[17px] relative nav-list cursor-pointer text-grey text-gray-800 cursor-pointer transition-all duration-400 hover:text-primary
                                }`}
                            // onClick={() => handleLinks(x)}
                            >
                                {x.title}
                            </li>
                        </Link >

                    ))}
                    {userrole === 'student' ?
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
                </ul>



                <div
                    className="sm:flex justify-center items-center md:hidden cursor-pointer"
                    onClick={showDrawer}
                >
                    <GiHamburgerMenu style={{ color: 'black', fontSize: '20px' }} color={'white'} size={20} />
                    {/* <GiHamburgerMenu color={'white'} size={20} /> */}
                </div>
            </div>

            <Drawer
                title={
                    <div
                        className="flex justify-between items-center p-0"
                        style={{ backgroundColor: '' }}
                    >  <Image
                            src='/logo.png'
                            alt='logo'
                            width={90}
                            height={90}

                        />
                        <div onClick={onClose}>
                            <CloseOutlined style={{ color: 'black', fontSize: '20px', margin: '5px', cursor: 'pointer' }} />
                            {/* <IoCloseSharp  /> */}
                        </div>
                    </div>
                }
                placement="top"
                closable={false}
                onClose={onClose}
                open={open}
                style={{ height: 'auto' }}
            >
                <ul className="flex flex-col">
                    {menu.map((x, i) => (
                        <Link href={x.link} key={i}>
                            <li
                                onClick={onClose}
                                className="list-none px-4 py-[6px] my-2 text-black text-[17px] cursor-pointer"
                            >
                                {x.title}
                                <hr />
                            </li>
                        </Link>
                    ))}
                </ul>
            </Drawer>
        </>
    );
};

export default Nav;