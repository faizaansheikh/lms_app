'use client'

import React, { useState, useEffect } from 'react'
import { Image } from 'antd'

function XUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
    }


    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)


        return () => URL.revokeObjectURL(objectUrl)
    }, [file])


    return (
        <div className='w-full h-[full]'>
            
            <input type="file"  onChange={handleFile} accept="image/*" className='border text-center cursor-pointer p-4 rounded-lg'/>

            {preview && (
                <div style={{ marginTop: 20, textAlign: 'center' }} className=''>
                    <Image
                        src={preview}
                        alt="preview"
                        style={{ borderRadius: 8 }}
                    />
                </div>
            )}
        </div>
    )
}

export default XUpload
