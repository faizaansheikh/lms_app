'use client'

import React, { useState, useEffect } from 'react'
import { Image } from 'antd'
import { useParams } from 'next/navigation'

function XUpload(props: any) {
    const { onChange, file, previewUrl } = props
    const params = useParams()
    const [preview, setPreview] = useState<string>('')


    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)


        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    useEffect(() => {
        if (params?.id !== 'new') {
            setPreview(previewUrl)
        }
    }, [previewUrl])
  
    
    return (
        <div className='w-full h-[full]'>

            <input type="file" onChange={onChange} accept="image/*" className='border text-center cursor-pointer p-4 rounded-lg' />

            {preview && (
                <div style={{ marginTop: 20 }} className=''>
                    <Image
                        src={preview}
                        alt="preview"
                        style={{ borderRadius: 8, width: 200 }}
                    />
                </div>
            )}
        </div>
    )
}

export default XUpload
