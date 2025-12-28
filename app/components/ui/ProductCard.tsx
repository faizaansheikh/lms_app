'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function ProductCard(props: any) {
    const { product } = props
    const router = useRouter()
    const handleProduct = () => {
        
        router.push(`/home/products/${product?.title}`)
    }
    return (

        <div onClick={handleProduct} className=" rounded-xl overflow-hidden bg-green-50 shadow-xl hover:shadow-xl  border border-transparent cursor-pointer hover:border-primary transition-all duration-300 ease-in-out">
            {/* Image */}
            <div className="relative h-64 w-full">
                <Image
                    src="/hero.jpg"
                    alt="Jewellery Product"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5 bg-[#EFE9E3] ">
                <h3 className="text-lg font-semibold text-gray-900">
                    {product?.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                    {product?.desc}
                </p>

                <div className="mt-8 flex items-center justify-between">

                    <span className="  px-0 rounded-lg text-lg hover:opacity-90 transition">
                        <span className='bg-[#b9b6b6] border border-green-60 w-full h-full px-3 py-2 rounded-[100%] mr-2'>B</span>
                        {product?.author}
                    </span>
                    <span className="text-primary font-bold text-lg">
                        {product?.price}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default ProductCard