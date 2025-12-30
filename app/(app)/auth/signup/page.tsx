'use client'

import { UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function page() {
  const router = useRouter()
  const save = () => {
      
   }
  const handleSignup = () => {
    router.push('/auth/login')
  }
  return (
    <div className='bg-[] w-full h-screen flex justify-center items-center' style={{ backgroundColor: '#F8F8F8' }}>

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
      <div className='bg-[] w-full h-screen flex flex-col justify-center items-center '>

        <div className='w-[500px] p-6 rounded-[16px] bg-white/10 backdrop-blur-md border-2 border-black/30 shadow-2xl'>
          <h2 className='text-start text-4xl mb-6 mt-4'>
            Welcome to XYZ <br /> Academy
          </h2>
          <p className='mb-4 '>
            create your account to continue
          </p>
          {/* <h2 className='text-white my-2 text-2xl'>Login</h2> */}
          <Input
            className='my-2'
            size="large"
            placeholder="User Name"
            suffix={<UserOutlined />}

          />
          <Input
            className='my-2'
            size="large"
            placeholder="Email"
            suffix={<UserOutlined />}

          />

          <Input
            className='my-2'
            size="large"
            placeholder="Password"
            type="password"

            suffix={<EyeInvisibleOutlined />}
          />
          <Input
            className='my-2'
            size="large"
            placeholder="Confirm Password"
            type="password"

            suffix={<EyeInvisibleOutlined />}
          />

          <button
            className='w-full mt-6 text-white rounded-lg bg-primary cursor-pointer hover:bg-[#da1c07]'
            style={{ padding: '10px 10px', backgroundColor: '' }}
            onClick={save}
          >
            Register
          </button>
          <p className='text-center pt-4'>Already have an account? <span onClick={handleSignup} className='cursor-pointer text-primary'>Sign In</span></p>
        </div>
      </div>



    </div>
  )
}

export default page;