import { Input } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CiViewTable } from "react-icons/ci";
import XModal from './XModal';
import { GeneralCoreService } from '../config/GeneralCoreService';
import CustomModal from './CustomModal';
import { useParams } from 'next/navigation';
import XPagination from './XPagination';

interface lookup {
    display: any
    placeholder: any
    formName: string,
    getData: any,
    multiple: any,
    vals: any

}
function Mylookup(props: lookup) {
    const { display, placeholder, formName, getData, multiple, vals } = props
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState<any>([])
    const [selectedRows, setSelectedRows] = useState<any>([]);

    const [selectedRow, setSelectedRow] = useState<string[]>([])
    const [totalCount, setTotalCount] = useState<any>(null)
    const [page, setPage] = useState<any>(1)
    const [rowsPerPage, setRowsPerPage] = useState<any>(10)

    const getAllRec = (page: any, size: any) => {
        GeneralCoreService(formName).GetAll(null, '', page, size)
            .then((res) => {
                if (res?.status === 200) {
                    const cols: any = res?.data?.data[0]
                    const { lessons, answers, questions, password, ...othersCols } = cols
                    setColumn(othersCols ? Object.keys(othersCols) : [])
                    setRowData([...res?.data?.data])
                    setTotalCount(Number(res?.data?.totalRecords))
                }


            }).catch((err) => console.log(err))
            .finally(() => { })
    }

    const handleLookup = () => {
        setOpenModal(true)
        getAllRec(page, rowsPerPage)
    }

    const handleRowClick = (x: any) => {
        setOpenModal(false)
        setInputVal(x._id)
        getData([x._id])
    }

    const handleCheckboxChange = (row: any, isChecked: any) => {
        if (isChecked) {
            // ✅ add row
            // setInutVal()
            setSelectedRows((prev: any) => [...prev, row]);

        } else {
            // ❌ remove row
            setSelectedRows((prev: any) =>
                prev.filter((item: any) => item._id !== row._id)
            );
        }
    };


    const handleModalSave = () => {
        const ids = selectedRows.map((x: any) => x?._id)
        getData(ids)
        setOpenModal(false)
    }

    useEffect(() => {
        if (selectedRows.length > 0) {
            const arr = selectedRows.map((x: any) => x._id)
            setInputVal(arr?.join(', '))
        }
    }, [selectedRows])

    useEffect(() => {
        // debugger
        if (params.id !== 'new') {
            const result = vals.map((id: any) => ({ _id: id }));
            setSelectedRows(result)
        }
    }, [vals])


    useEffect(() => {
        if (totalCount) {
            getAllRec(page, rowsPerPage)
        }


    }, [page, rowsPerPage])
    return (
        <>


            <div className="relative w-full">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputVal}
                    readOnly
                    className="w-full bg-amber-50 border border-blue-200 p-2 pr-10 text-[16px] rounded-md"
                />

                {/* Icon */}
                <div className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
                    <CiViewTable size={20} onClick={() => handleLookup()} />
                </div>
            </div>

            {/* 
            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            } */}


            <CustomModal okText='Add' open={openModal} setOpen={setOpenModal} title={'Lookup Name'}
                extraBtn={
                    <>
                        <button
                            onClick={handleModalSave}
                            type="button"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                            Save
                        </button>
                    </>
                }
                content={
                    <>
                        <div className='w-full max-h-[500px] overflow-y-scroll'>
                            <table className='w-full'>
                                <thead className=''>

                                    <tr className='bg-gray-200' >
                                        {multiple && <td className='p-3 text-[] font-bold text-[14px]'>Select</td>}
                                        {
                                            column?.map((x, i) => (
                                                <td className='p-3 text-[] font-bold text-[14px]' key={i}>{x}</td>
                                            ))
                                        }


                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        rowData.map((x: any, i: number) => (


                                            <tr onClick={() => multiple ? {} : handleRowClick(x)} className={`
                                                    border-b border-[lightgrey]
                                                    cursor-pointer transition-colors
                                             bg-secondary hover:bg-red-200
                                                // ? 'bg-red-200 hover:bg-red-300'
                                                // : 'bg-secondary hover:bg-secondary/80'
                                            }
                                                `} key={i}>
                                                {multiple && <td className=' text-[14px] py-2 px-3'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.some((item: any) => item._id === x._id)}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(x, e.target.checked)
                                                        }
                                                    />
                                                </td>}
                                                {
                                                    column.map((z, ind) => (
                                                        <td className=' text-[14px] py-2 px-3 cursor-pointer ' key={ind}>{x[z]}</td>
                                                    ))
                                                }

                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='w-full bg-gray-300 flex justify-between items-center h-[auto] py-4 px-4  sticky bottom-0 z-20' >
                            Total Records: {totalCount}
                            <XPagination totalCount={totalCount} page={page} setPage={setPage} setRowsPerPage={setRowsPerPage} getAll={getAllRec} />
                        </div>
                    </>
                } />
        </>
    )
}

export default Mylookup