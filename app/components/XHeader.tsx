import React, { useState } from 'react'
import XButton from './XButton'
import { MdOutlineFileDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { Checkbox, CheckboxProps, Input, Popover } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import ThemeToggle from './ThemeToggle';
interface headerProps {
    title: string
    selectedRows: any,
    rowData: any,
    setColumns: any,
    column: any
}
function XHeader(props: headerProps) {
    const router = useRouter()
    const path = usePathname()
    const { title, selectedRows, rowData, setColumns, column } = props
    // const [check,setCheck] = useState<boolean>(true)
    const onChangeAll = (e: any, label: string) => {

        const val = e.target.checked
        if (val) {

            setColumns((prev: any) => prev.filter((x: any) => x !== label))
        } else {
            setColumns([
                label,
                ...column,
            ])
        }
    };
    const handleAddNew = () => {
        const url = path.split('/')[2] ?? 'undefined'
        router.push(`${url}/new`)
    }


    return (


        <div className=' w-full  flex justify-between items-center  sticky top-0 z-200 py-4 px-4'>
            <div className='flex items-center'>

                <span className='text-2xl '>{title}</span>
            </div>
            <div className='flex items-center gap-0'>
              
                <span> <Input style={{ width: '300px', padding: '7px 7px' }} placeholder="Search" prefix={<CiSearch className='mx-1' size={20} />} /></span>
                <span className='px-3'><XButton label='Add New' icon={true}  Click={() => handleAddNew()} /></span>

                <Popover trigger='click' className=' cursor-pointer  px-0 py-2 flex items-center gap-2 rounded-lg' placement="bottom" title={"Columns"} content={
                    <div className='flex flex-col gap-2'>
                        {Object.keys(rowData[0])?.map((x, i) => (
                            <span key={i}>
                                <span className='pr-3'><Checkbox onChange={(e) => onChangeAll(e, x)}></Checkbox></span>
                                <span>{x}</span>
                            </span>
                        ))}


                    </div>
                }>

                    <span className='px-0 text-[#a9a5a5] hover:text-[grey]'><FaFilter  size={18} /></span>

                </Popover>




                <span className='px-2 cursor-pointer text-[#a9a5a5] hover:text-[grey]'><MdOutlineFileDownload  size={30} /></span>
                <span className='pr-1 cursor-pointer text-[#a9a5a5] hover:text-[grey]'><CiCircleList size={30} /></span>
                {selectedRows.length > 0 && <span className='ml-2 bg-[] border-1 border-[red] rounded-lg cursor-pointer hover:shadow '>
                    <MdDelete className='p-2 text-[red] ' size={37} />

                </span>}
                {/* <span className='bg-[#fbd06d] rounded-lg cursor-pointer hover:shadow flex items-center gap-2'>

                    <MdOutlineFileDownload className='p-2 text-primary ' size={37} />
                </span> */}

            </div>



        </div>


    )
}

export default XHeader