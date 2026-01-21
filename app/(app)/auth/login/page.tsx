'use client'


import { setAuthToken } from '@/app/components/authToken';
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, message, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
function page() {
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<any>({
    defaultValues: { email: '', password: '' },
  })



  const save = (values: any) => {
    setLoader(true)
    GeneralCoreService('users/login').Save(values)
      .then((res) => {

        if (res?.status === 200) {
          message.success(res?.message)
     
          setAuthToken(res?.token)
          localStorage.setItem('userInfo', JSON.stringify(res?.user))
          router.push(res?.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/client')
        } else {
          message.error(res?.message)
        }
      })
      .catch((err) => console.log('error', err))
      .finally(() => setLoader(false))



  }
  const handleSignup = () => {
    router.push('/auth/signup')
  }
  return (
    <div className='bg-[] my-5 md:mt-0 flex justify-center items-center ' style={{ backgroundColor: '#F8F8F8' }}>

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
      <div className='bg-[] w-full h-screen flex flex-col justify-center items-center'>

        <div className='mx-4 md:w-[500px] p-6 rounded-[16px] bg-white/10 backdrop-blur-md border-2 border-black/30 shadow-2xl'>
          <h2 className='text-start text-4xl mb-4 mt-4'>
            Welcome to Chrissy Medical Academy
          </h2>
          <p className='mb-2 '>
            See your support, enter your credentials to login
          </p>
          {/* <h2 className='text-white my-2 text-2xl'>Login</h2> */}
          <form onSubmit={handleSubmit(save)}>

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
                  suffix={<UserOutlined />}

                  aria-invalid={errors['email'] ? true : false}
                />


              )}
            />

            {
              errors['email'] && <p className='text-red-600 text-sm px-1' role='alert'>{errors['email']?.message as string}</p>
            }


            <Controller
              name={'password'}
              control={control}
              rules={{
                required: "Password is required",

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
                loader ? <Spin /> : 'Login'
              }

            </button>
          </form>
          <p className='text-center pt-4'>Don’t have an account? <span onClick={handleSignup} className='cursor-pointer text-primary'>Sign Up</span></p>
        </div>
      </div>



    </div>
  )
}

export default page;