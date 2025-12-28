import React from 'react'
import XButton from '../XButton'

function Navbar() {
  return (
    <div className='bg-rsed-300 w-full h-15 flex justify-around items-center'>
        <div>Logo</div>
        <div className='flex items-center gap-2'>
            <span className='text-primary cursor-pointer h-15 w-auto px-4 flex items-center  hover:bg-[#e9e5e5] duration-200'>Login</span>
            <XButton label='Sign up' />
        </div>
    </div>
  )
}

export default Navbar