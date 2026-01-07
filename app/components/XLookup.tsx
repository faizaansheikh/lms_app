import { Input } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CiViewTable } from "react-icons/ci";
import XModal from './XModal';
import { GeneralCoreService } from '../config/GeneralCoreService';
import CustomModal from './CustomModal';
import { useParams } from 'next/navigation';

interface lookup {
    value: any
    control: any
    validations: any
    placeholder: any
    errors: any,
    formName: string,
    multiple?: boolean,
    valueField: any,
    getData?: any,
    setValueField?: any

}
function XLookup(props: lookup) {
    const { value, control, validations, placeholder, errors, formName, multiple, valueField, getData, setValueField } = props
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [column, setColumn] = useState<string[]>([])
    const [rowData, setRowData] = useState([])
    const [val, setVal] = useState('')
    const [selId, setSelId] = useState<any>([])
    const getAllRec = () => {
        GeneralCoreService(formName).GetAll()
            .then((res) => {
                setColumn(res?.data?.length > 0 ? Object.keys(res?.data[0]) : []);
                setRowData(res?.data)

            }).catch((err) => console.log(err))
            .finally(() => { })
    }

    const handleLookup = () => {
        setOpenModal(true)
        getAllRec()
    }

    const handleRowClick = (x: any) => {
        if (multiple) {
            getData(x);
            let arr =  []
            arr.push(x.title)

            setValueField(JSON.stringify(arr))
            // setSelId((prev: any) =>
            //     prev.some((item: any) => item.id === Number(x._id))
            //         ? prev.filter((item: any) => item.id !== Number(x._id))
            //         : [...prev, { id: Number(x._id), title: x.title }]
            // )


        }



    }
    // useEffect(() => {
    //     setValue(JSON.stringify(selId.map((item:any) => item.id)))


    // }, [selId])

    // useEffect(() => {
    //     if (params.id !== 'new') {
    //         console.log(JSON.parse(valueField));

    //     }
    // }, [params.id,valueField])

    console.log('test...');

    return (
        <>


            <div className="relative w-full">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={valueField}
                    readOnly
                    className="w-full bg-amber-50 border border-blue-200 p-2 pr-10 text-[16px] rounded-md"
                />

                {/* Icon */}
                <div className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
                    <CiViewTable size={20} onClick={() => handleLookup()} />
                </div>
            </div>


            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            }


            <CustomModal okText='Add' open={openModal} setOpen={setOpenModal} title={'Lookup Name'} content={
                <>
                    <div className='w-full max-h-[500px] overflow-y-scroll'>
                        <table className='w-full'>
                            <thead className=''>

                                <tr className='bg-gray-200' >

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
                                        <tr onClick={() => handleRowClick(x)} className={`
                                                    border-b border-[lightgrey]
                                                    cursor-pointer transition-colors
                                                     ${selId.some((item: any) => item.id === Number(x._id))
                                                ? 'bg-red-200 hover:bg-red-300'
                                                : 'bg-secondary hover:bg-secondary/80'
                                            }
                                                `} key={i}>

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

export default XLookup