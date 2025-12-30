'use client'
// import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { data } from './data';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { CiEdit } from "react-icons/ci";
import XHeader from './XHeader';
import XPagination from './XPagination';
interface registerProps {
    formName: string
}
function Register(props: registerProps) {
    const { formName } = props
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState([...data])
    const [selectedRow, setSelectedRow] = useState<string[]>([])
    const onChangeAll: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const handleCheckbox = (e: any, row: any, i: number) => {


        if (e.target.checked) {

            setSelectedRow((prev) => [...prev, row])
        } else {
            setSelectedRow((prev) => prev.filter((z: any) => z.id !== row.id));

        }


    };


    useLayoutEffect(() => {
        const cols = Object.keys(data[0]) ?? []
        const [id, name, address, phone, website, ...othersCols] = cols
        let arr = ['username','email','password']

        setColumn(arr)
    }, [])
    return (
        <>




            {/* ====================================table==================================== */}

            <div className='mt-0  border-1 border-[#a7a5a5] rounded-2xl w-full h-[590px] overflow-y-scroll'>


                <div className='w-full h-[70px] bg-gray-200 sticky top-0 z-20' >
                    <XHeader title={formName || ''} selectedRows={selectedRow} rowData={rowData} setColumns={setColumn} column={column} />
                </div>
                <div className='w-full '>
                    <table className='w-full'>
                        <thead className=''>

                            <tr className='bg-gray-300' >
                                <td className='pr-4 pl-4 '><Checkbox onChange={onChangeAll}></Checkbox></td>
                                {
                                    column?.map((x, i) => (
                                        <td className='py-6 text-[] font-bold text-[14px]' key={i}>{x}</td>
                                    ))
                                }
                                <td className='text-[] text-[14px] font-bold '>Actions</td>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                rowData.map((x: any, i) => (
                                    <tr style={{ backgroundColor: selectedRow.includes(x) ? '#fbd06d' : '' }} className={`bg-secondary border-b-1 border-[lightgrey] `} key={i}>
                                        <td className='pl-4'><Checkbox onChange={(e) => handleCheckbox(e, x, i)}></Checkbox></td>
                                        {
                                            column.map((z, ind) => (
                                                <td className='font-normal text-[13px] text-start py-2 ' key={ind}>{x[z]}</td>
                                            ))
                                        }

                                        <td className='text-[14px] text-start py-3'>
                                            <span className='flex gap-2 items-center r'>
                                                <CiEdit size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />
                                                <IoEyeOutline size={18} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />

                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='w-full bg-gray-300 flex justify-end items-center h-[auto] py-0  sticky bottom-0 z-20' >
                    <XPagination />
                </div>

            </div>
        </>
    )
}

export default Register