'use client'
import { Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import XButton from '../XButton'
import { useRouter } from 'next/navigation'
import ProductCard from './ProductCard'
import { GeneralCoreService } from '@/app/config/GeneralCoreService'

function Courses({ allProd }: any) {
    const router = useRouter()
    const [course, setCourse] = useState([])
    const handleViewProd = () => {
        router.push('/home/products')
    }
    const getCourses = () => {
        GeneralCoreService('courses').GetAll()
            .then((res) => {
                setCourse(res?.data);

            }).catch((err) => console.log(err))
    }
    useEffect(() => {
        getCourses()
    }, [])
    const arr = [

        {
            img: '/noimg.png',
            title: 'Sterile Processing / Central Service Comprehensive Training',
            desc: 'Sterile Processing Technician Certification Course Launch Your Healthcare Career in Just 8 Weeks',
            author: 'Brandum Marcom',
            price: '$500',
        },
       
    ]
    return (
        <div className='mt-12'>
            {!allProd && <p className='text-2xl md:text-3xl text-center'>{course?.length ? "Featured Courses" :'No courses available right now'}</p>}
            <div className='my-8 mx-8 md:mx-12 lg:mx-38'>
                <Row justify="center" gutter="2rem">
                    {
                        course?.length > 0 ? course?.map((x, i) => (
                            <Col className="gutter-row my-4" xs={24} md={12} lg={8} key={i}>
                                <ProductCard product={x} />
                            </Col>
                        )) : <div>

                            <Image
                                src='/noitems.jpg'
                                alt='no items'
                                width={500}
                                height={500}
                            />
                        </div>
                    }
                </Row>
                {(!allProd && course?.length) && <div onClick={handleViewProd} className='flex justify-center items-center mt-8' > <XButton label='View All Products' /></div>}


            </div>


        </div>
    )
}

export default Courses