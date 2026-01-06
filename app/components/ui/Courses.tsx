'use client'
import { Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import XButton from '../XButton'
import { useRouter } from 'next/navigation'
import ProductCard from './ProductCard'
import { GeneralCoreService } from '@/app/config/GeneralCoreService'

function Courses() {
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
            img: '',
            title: 'Online 2 Hour Med Tech Class Renewal',
            desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
            author: 'Brandum Marcom',
            price: '$60',
        },
        {
            img: '',
            title: 'Online 2 Hour Med Tech Class Renewal',
            desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
            author: 'Brandum Marcom',
            price: '$60',
        },
        {
            img: '',
            title: 'Online 2 Hour Med Tech Class Renewal',
            desc: 'Featured Courses Online 2 Hour Med Tech Class Renewal',
            author: 'Brandum Marcom',
            price: '$60',
        }
    ]
    return (
        <div className='mt-12'>
            <p className='text-3xl text-center'>Featured Courses</p>
            <div className='my-8 mx-8 md:mx-12 lg:mx-38'>
                <Row justify="center" gutter="2rem">
                    {
                        course.length > 0 ? course?.map((x, i) => (
                            <Col className="gutter-row my-4" xs={24} md={12} lg={8} key={i}>
                                <ProductCard product={x} />
                            </Col>
                        )) : <p>No courses to show</p>
                    }
                </Row>
                <div onClick={handleViewProd} className='flex justify-center items-center mt-8' > <XButton label='View All Products' /></div>


            </div>


        </div>
    )
}

export default Courses