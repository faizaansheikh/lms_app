'use client'

import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, message, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdHomeWork } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Controller, useForm } from 'react-hook-form';
function page() {
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    defaultValues: { name: '', email: '', password: '', role: 'student' },
  })



  const save = (values: any) => {
    setLoader(true)
    GeneralCoreService('users/register').Save(values)
      .then((res) => {

        if (res?.status === 201) {

          message.success(res?.message)
          router.push('/auth/login')
        } else {
          message.error(res?.message)
        }
      })
      .catch((err) => console.log('error', err))
      .finally(() => setLoader(false))



  }
  const handleSignup = () => {
    router.push('/auth/login')
  }
  return (
    <div className='bg-[] w-full my-5 md:mt-0 flex justify-center items-center' style={{ backgroundColor: '#F8F8F8' }}>

      <div className='hidden md:flex relative w-full h-screen '>
        {/* Image */}
        {/* Black overlay */}
        <Image
          src={'/login.jpg'}
          fill
          alt=''
          className='object-cover'
          style={{ borderRadius: '0px 60px 60px 0px' }}
        />
        <div className="absolute inset-0 bg-black/40 rounded-[0px_60px_60px_0px]" />


      </div>
      <div className='bg-[] w-full my-2 flex flex-col justify-center items-center '>

        <div className='mx-4 md:w-[500px] p-6 rounded-[16px] bg-white/10 backdrop-blur-md border-2 border-black/30 shadow-2xl'>
          <h2 className='text-start text-4xl mb-4 mt-4'>
            Welcome to Chrissy Medical Academy
          </h2>
          <p className='mb-2 '>
            Create your account
          </p>
          {/* <h2 className='text-white my-2 text-2xl'>Login</h2> */}
          <form onSubmit={handleSubmit(save)}>

            <Controller
              name={'name'}
              control={control}
              rules={{
                required: "Username is required",
                maxLength: {
                  value: 15,
                  message: "Username cannot exceed from 15 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className='my-2'
                  size="large"
                  placeholder="Username"
                  suffix={<UserOutlined />}

                  aria-invalid={errors['name'] ? true : false}
                />


              )}
            />

            {
              errors['name'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['name']?.message as string}</p>
            }
            <Controller
              name={'email'}
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
                maxLength: {
                  value: 50,
                  message: "Email cannot exceed 50 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className='my-2'
                  size="large"
                  placeholder="Email"
                  suffix={<MdEmail />}

                  aria-invalid={errors['email'] ? true : false}
                />


              )}
            />

            {
              errors['email'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['email']?.message as string}</p>
            }

            <Controller
              name={'phone'}
              control={control}
              rules={{
                required: "Phone number is required",
                maxLength: {
                  value: 15,
                  message: "Number cannot exceed from 15 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className='my-2'
                  size="large"
                  placeholder="Phone number"
                  suffix={<FaPhone />}

                  aria-invalid={errors['phone'] ? true : false}
                />


              )}
            />

            {
              errors['phone'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['phone']?.message as string}</p>
            }

            <Controller
              name={'address'}
              control={control}
              rules={{
                required: "Address is required",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className='my-2'
                  size="large"
                  placeholder="Enter your address"
                  suffix={<MdHomeWork />}

                  aria-invalid={errors['address'] ? true : false}
                />


              )}
            />

            {
              errors['address'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['address']?.message as string}</p>
            }
            <Controller
              name={'password'}
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                },

              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  className='my-2'
                  size="large"
                  placeholder="Password"
                  type="password"
                  aria-invalid={errors['password'] ? true : false}

                />
              )}
            />

            {
              errors['password'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['password']?.message as string}</p>
            }




            <button
              className='w-full mt-6 text-white rounded-lg bg-primary cursor-pointer hover:bg-[#da1c07]'
              style={{ padding: '10px 10px', backgroundColor: '' }}
              type='submit'
              disabled={loader}
            >
              {
                loader ? <Spin /> : 'Register'
              }

            </button>
          </form>
          <p className='text-center pt-4'>Already have an account? <span onClick={handleSignup} className='cursor-pointer text-primary'>Sign In</span></p>
        </div>
      </div>



    </div>
  )
}

export default page;