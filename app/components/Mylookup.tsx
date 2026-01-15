import { Input } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CiViewTable } from "react-icons/ci";
import XModal from './XModal';
import { GeneralCoreService } from '../config/GeneralCoreService';
import CustomModal from './CustomModal';
import { useParams } from 'next/navigation';

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
    const [rowData, setRowData] = useState([])
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const getAllRec = () => {
        GeneralCoreService(formName).GetAll()
            .then((res) => {
                const resData = res?.data

                const cols = resData[0] ?? {}
                const { answers, ...otherCols } = cols

                setColumn(Object.keys(otherCols) ?? []);
                setRowData(resData)

            }).catch((err) => console.log(err))
            .finally(() => { })
    }

    const handleLookup = () => {
        setOpenModal(true)
        getAllRec()
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

    console.log(selectedRows)
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
                                        rowData.map((x: any, i) => (


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
                    </>
                } />
        </>
    )
}

export default Mylookup