import React, { useEffect, useState } from 'react'
import XButton from './XButton'
import { MdOutlineFileDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { Checkbox, CheckboxProps, Input, message, Popover, Select } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import ThemeToggle from './ThemeToggle';
import { CiCircleRemove } from "react-icons/ci";
import axiosInstance from '../config/axiosInstance';
interface headerProps {
    title: string
    selectedRows: any,
    rowData: any,
    setColumns: any,
    column: any,
    setLoader: any
    setRowData: any
    rowsPerPage: any
    page: any
    getAllRec: any
}
function XHeader(props: headerProps) {
    const router = useRouter()
    const path = usePathname()
    const { title, selectedRows, rowData, setColumns, column, setLoader, setRowData, rowsPerPage, page, getAllRec } = props
    const [opt, setOpt] = useState([])
    const [rowVal, setRowVal] = useState('')
    const [colVal, setColVal] = useState('')



    const handleAddNew = () => {
        router.push(`${path}/new`)
    }


    const getAll = async () => {

        setLoader(true)
        try {
            const response = await axiosInstance.post(`/${title}/search?col=${colVal}&row=${rowVal}`)
            const res = { data: response?.data, status: response.status }
            setRowData(res?.data)

        } catch (err: any) {
            message.error('Error searching column!')
            console.log(err)
        } finally {
            setLoader(false)
        }


    }
    const handleSearch = () => {
        if (colVal && rowVal) {
            getAll()
        } else {
            message.error('Please select both fields')
        }

    }
    const handleRemove = () => {
        setRowVal('')
        // setColVal('')
        getAllRec(page, rowsPerPage)
    }

    useEffect(() => {
        const arr = column?.map((x: any) => (
            {
                label: x,
                value: x,
            }
        ))
        setOpt(arr)
    }, [column])

    return (


        <div className=' w-full  flex justify-between items-center  sticky top-0 z-200 py-4 px-4'>
            <div className='flex items-center'>

                <span className='text-2xl '>{title}</span>
            </div>
            <div className='flex items-center gap-0'>




                <Select
                    style={{ width: '180px', padding: '7px 7px', margin: '0 12px' }}

                    placeholder={'Select Column'}
                    // defaultValue={['happy']}
                    onChange={(value) => {
                        console.log(value)
                        setColVal(value);
                    }}
                    options={[...opt]}

                />
                <span>
                    <Input
                        style={{ width: '250px', padding: '7px 7px', margin: '0px 5px' }}
                        placeholder="Search Row"
                        prefix={<CiSearch className='mx-1' size={20} />}
                        value={rowVal}
                        onChange={(e: any) => setRowVal(e.target.value)}

                    />
                </span>
                {rowVal && <span onClick={handleRemove}><CiCircleRemove size={30} className='cursor-pointer' /></span>}
                <span className='px-1'><XButton label='Search' Click={() => handleSearch()} /></span>

                {
                    title !== 'enrollment' &&
                    title !== 'lesson_progress' && (
                        <span className="px-2">
                            <XButton label="Add New" Click={handleAddNew} />
                        </span>
                    )
                }






            </div>



        </div>


    )
}

export default XHeader