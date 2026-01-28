'use client'
// import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react'
import { Checkbox, message, Spin } from 'antd';
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
import { SiMinutemailer } from "react-icons/si";
import { getUser } from '../utility';
interface registerProps {
    formName: string
}
function Register(props: registerProps) {
    const { formName } = props
    const router = useRouter()
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState<string[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openRem, setOpenRem] = useState<boolean>(false)
    const [delId, setDelId] = useState<any>(null)
    const [selectedRow, setSelectedRow] = useState<string[]>([])
    const [totalCount, setTotalCount] = useState<any>(null)
    const [page, setPage] = useState<any>(1)
    const [rowsPerPage, setRowsPerPage] = useState<any>(10)
    const [loader, setLoader] = useState<any>(false)
    const [mounted, setMounted] = useState(false);
    const [remData, setRemData] = useState<any>({});
    const [btnLoad, setBtnLoad] = useState(false);

    const handleEmail = (x: any) => {
        setOpenRem(true)
        setRemData(x)
    }

    const handleUpdateRec = (x: any) => {

        if (formName === 'course_lessons') {
            router.push(`${formName}/${x?.course_id}`)
        } else if (formName === 'quiz_questions') {
            router.push(`questions/${x?._id}`)
        } else {
            router.push(`${formName}/${x?._id}`)
        }

    }
    const getAllRec = (page: any, size: any) => {

        setLoader(true)
        GeneralCoreService(formName).GetAll(null, '', page, size)
            .then((res: any) => {

                if (res?.status === 200) {
                    const cols: any = res?.data?.data[0]
                    const { lessons, answers, questions, password, description, outline, ...othersCols } = cols
                    setColumn(othersCols ? Object.keys(othersCols) : [])
                    setRowData(res?.data ? [...res?.data?.data] : [])
                    setTotalCount(Number(res?.data?.totalRecords))
                }


            }).catch((err: any) => console.log('error', err)).finally(() => setLoader(false))

    }
    const handleDeleteRec = (x: any) => {
        setOpenModal(true)
        setDelId(x?._id)

    }
    const reminderUser = () => {
        setBtnLoad(true)
       
        const payload = {
            userId:remData?.user_id,
            amount:remData?.payment
        }
        GeneralCoreService('users/email').Save(payload)
            .then((res: any) => {
                if (res?.status === 200) {
                    message.success(res?.message)

                } else {
                    message.error(res?.message)
                }


            }).catch((err: any) => console.log('error', err))
            .finally(() => {
                setOpenRem(false)
                setBtnLoad(false)
            })

    }
    const deleteRec = () => {

        GeneralCoreService(formName).Delete(delId)
            .then((res: any) => {
                if (res?.status === 200) {
                    message.success(res?.message)
                    getAllRec(page, rowsPerPage)
                } else {
                    message.error(res?.message)
                }


            }).catch((err: any) => console.log('error', err))
            .finally(() => setOpenModal(false))

    }
    const updatedRows = (col: any, row: any) => {
        if (col === 'thumbnail') {
            return row[col] ? <Image src={row[col]} alt="" width={45} height={45} className='w-[45] h-[45]' /> : ''
        } else if (col === 'answers') {
            return 'array'
        } else if (col === 'is_completed') {
            if (col) {
                return 'Lesson completed'
            } else {
                return 'Lesson Pending'
            }

        }
        else {
            return row[col]
        }


    }

    useEffect(() => {
        getAllRec(page, rowsPerPage)

    }, [page, rowsPerPage])

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return
    return (
        <>

            <CustomModal okText='Delete' open={openModal} setOpen={setOpenModal} title='Confirmation' content={<>
                <p>Are you sure you want to delete this record from table?</p>
            </>} onOk={deleteRec} />

            <CustomModal okText='Send Reminder' open={openRem} setOpen={setOpenRem} title='Reminder' content={<>
                <p>Are you sure you want to send a reminder email to this user?</p>
            </>} onOk={reminderUser} loader={btnLoad} />


            {/* ====================================table==================================== */}

            <div className='mt-0  border-1 border-[#a7a5a5] rounded-2xl w-full h-[590px] overflow-y-scroll'>


                <div className='w-full h-[70px] bg-gray-200 sticky top-0 z-20' >
                    <XHeader
                        title={formName || ''}
                        setLoader={setLoader}
                        selectedRows={selectedRow}
                        rowData={rowData} setRowData={setRowData}
                        setColumns={setColumn}
                        column={column}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        getAllRec={getAllRec}
                    />
                </div>
                <div className='w-full '>
                    {loader ?
                        <div className="h-[400px] z-10 flex items-center justify-center bg-black/0 rounded-xl" >
                            <Spin size="large" />
                        </div >
                        : rowData?.length > 0 ? <table className='w-full'>
                            <thead className=''>

                                <tr className='bg-gray-300' >

                                    {
                                        column?.map((x, i) => (
                                            <td className={`py-6 text-[] font-bold text-[14px] ${i === 0 ? 'pl-5' : ''}`} key={i}>{x}</td>
                                        ))
                                    }
                                    <td className='text-[] text-[14px] font-bold '>Actions</td>

                                </tr>

                            </thead>
                            <tbody>

                                {rowData.map((x: any, i) => (
                                    <tr style={{ backgroundColor: selectedRow.includes(x) ? '#fbd06d' : '' }} className={`bg-secondary border-b-1 border-[lightgrey] `} key={i}>

                                        {
                                            column.map((z, ind) => (
                                                <td className={`font-normal text-[13px] text-start py-2 ${ind === 0 ? 'pl-5' : ''}`} key={ind}>{updatedRows(z, x)}</td>
                                            ))
                                        }

                                        <td className='text-[14px] text-start py-3'>
                                            <span className='flex gap-2 items-center '>
                                                {formName === 'enrollment' ? <SiMinutemailer onClick={() => handleEmail(x)} size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' /> : <CiEdit onClick={() => handleUpdateRec(x)} size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />}
                                                <MdDeleteOutline onClick={() => handleDeleteRec(x)} size={18} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />


                                            </span>
                                        </td>
                                    </tr>
                                ))}




                            </tbody>
                        </table>
                            :
                            <div className='flex items-center justify-center m-12'>

                                <Image
                                    src='/noitems.jpg'
                                    alt='no items'
                                    width={500}
                                    height={500}
                                />
                            </div>
                    }

                </div>
                <div className='w-full bg-gray-300 flex justify-between items-center h-[auto] py-4 px-4  sticky bottom-0 z-20' >
                    Total Records: {totalCount}
                    <XPagination totalCount={totalCount} page={page} setPage={setPage} setRowsPerPage={setRowsPerPage} getAll={getAllRec} />
                </div>

            </div>
        </>
    )
}

export default Register