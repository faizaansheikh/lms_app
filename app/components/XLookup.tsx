import { Input } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CiViewTable } from "react-icons/ci";
import XModal from './XModal';

interface lookup {
    value: any
    control: any
    validations: any
    placeholder: any
    errors: any
}
function XLookup(props: lookup) {
    const { value, control, validations, placeholder, errors } = props
    const [openModal, setOpenModal] = useState(false)
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState([{name:'test'}])
    const handleLookup = () => {
        setOpenModal(true)
        const cols = Object.keys(rowData[0]) ?? []
        const [id, ...othersCols] = cols


        setColumn([...othersCols])
    }

    return (
        <>
            <Controller
                name={value}
                control={control}
                rules={{ ...validations }}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={placeholder}
                        style={{ padding: '8px', fontSize: '16px', background: '#F5F5F0' }}
                        aria-invalid={errors[value] ? true : false}
                        suffix={<div className='cursor-pointer' onClick={() => handleLookup()}><CiViewTable size={25} /></div>}
                    />

                )}
            />

            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            }


            <XModal open={openModal} setOpen={setOpenModal} title={'Lookup Name'} content={
                <>
                    <div className='w-full max-h-[500px] overflow-y-scroll'>
                        <table className='w-full'>
                            <thead className=''>

                                <tr className='bg-primary' >

                                    {
                                        column?.map((x, i) => (
                                            <td className='p-6 text-[] font-bold text-[14px]' key={i}>{x}</td>
                                        ))
                                    }


                                </tr>

                            </thead>
                            <tbody>
                                {
                                    rowData.map((x: any, i) => (
                                        <tr style={{ backgroundColor: '' }} className={`bg-secondary border-b-1 border-[lightgrey] hover:bg-red-200`} key={i}>

                                            {
                                                column.map((z, ind) => (
                                                    <td className=' text-[13px]  py-2 px-6 cursor-pointer ' key={ind}>{x[z]}</td>
                                                ))
                                            }

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            } />
        </>
    )
}

export default XLookup