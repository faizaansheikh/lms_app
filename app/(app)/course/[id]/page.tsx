'use client'
import { titleFromSlug } from '@/app/utility'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function page() {
    const param = useSearchParams()
    const search = param.get('q') || ''
    const title = titleFromSlug(search);
    console.log(title);

    return (
        <>
           <p className='text-xl font-bold'> {title}</p>
        </>
    )
}

export default page