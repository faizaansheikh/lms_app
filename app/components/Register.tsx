'use client'
// import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react'
import { Checkbox, message } from 'antd';
import type { CheckboxProps } from 'antd';
import { CiEdit } from "react-icons/ci";
import XHeader from './XHeader';
import XPagination from './XPagination';
import { GeneralCoreService } from '../config/GeneralCoreService';
import { useRouter } from 'next/navigation';
import { MdDeleteOutline } from "react-icons/md";
import XModal from './XModal';
import Image from 'next/image';
import CustomModal from './CustomModal';
interface registerProps {
    formName: string
}
function Register(props: registerProps) {
    const { formName } = props
    const router = useRouter()
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState<string[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [delId, setDelId] = useState<any>(null)
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

    const handleUpdateRec = (x: any) => {
        
        if (formName === 'course_lessons') {
            router.push(`${formName}/${x?.course_id}`)
        } else if(formName === 'quiz_questions'){
            router.push(`questions/${x?._id}`)
        }else {
            router.push(`${formName}/${x?._id}`)
        }

    }
    const getAllRec = () => {

        GeneralCoreService(formName).GetAll()
            .then((res: any) => {

                if (res?.status === 200) {
                    const cols: any = res.data[0]
                    const { lessons, answers, ...othersCols } = cols
                    setColumn(othersCols ? Object.keys(othersCols) : [])
                    setRowData([...res?.data])
                }


            }).catch((err: any) => console.log('error', err))

    }
    const handleDeleteRec = (id: number) => {
        setOpenModal(true)
        setDelId(id)

    }
    const deleteRec = () => {

        GeneralCoreService(formName).Delete(delId)
            .then((res: any) => {
                if (res?.status === 200) {
                    message.success(res?.message)
                    getAllRec()
                } else {
                    message.error(res?.message)
                }


            }).catch((err: any) => console.log('error', err))
            .finally(() => setOpenModal(false))

    }
    const updatedRows = (col: any, row: any) => {
        console.log(row[col])
        if (col === 'thumbnail') {
            return row[col] ? <Image src={row[col]} alt="" width={45} height={45} className='w-[45] h-[45]' /> : ''
        } else if (col === 'answers') {
            return 'array'
        }
        else {
            return row[col]
        }


    }
    useEffect(() => {
        getAllRec()

    }, [])
    return (
        <>

            <CustomModal okText='Delete' open={openModal} setOpen={setOpenModal} title='Confirmation' content={<>
                <p>Are you sure you want to delete this record from table?</p>
            </>} onOk={deleteRec} />


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
                                                <td className='font-normal text-[13px] text-start py-2 ' key={ind}>{updatedRows(z, x)}</td>
                                            ))
                                        }

                                        <td className='text-[14px] text-start py-3'>
                                            <span className='flex gap-2 items-center r'>
                                                <CiEdit onClick={() => handleUpdateRec(x)} size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />
                                                <MdDeleteOutline onClick={() => handleDeleteRec(x?._id)} size={18} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />


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