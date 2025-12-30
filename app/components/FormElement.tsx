'use client'
import { Col, Divider, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTheme } from 'next-themes';
import XFormHeader from './XFormHeader';
import XLookup from './XLookup';
import XInput from './XInput';
interface FormElems {
    elements: any,
    setModel: any,
    model: any,
    save: any,
}
function FormElement(props: FormElems) {
    const { elements, setModel, model, save } = props
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);



    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<any>({
        defaultValues: { ...model },
    })

    const FormComponent = (x: any) => {

        switch (x.type) {
            case 'input':
                return <>
                    <XInput
                        value={x.key}
                        control={control}
                        validations={x.validations}
                        placeholder={x.placeholder}
                        errors={errors}
                    />
                  
                </>
            case 'lookup':
                return <>
                    <XLookup
                        value={x.key}
                        control={control}
                        validations={x.validations}
                        placeholder={x.placeholder}
                        errors={errors}
                    />
                </>

            default:
                break;
        }


    }

    if (!mounted) {
        return null;
    }
    return (
        <form onSubmit={handleSubmit(save)}>
            <XFormHeader title='Users' />
            <Row className=' pb-6'>
                {
                    elements?.map((x: any, i: number) => {
                        return (
                            <Col key={i} span={x.col}>
                                <div className='bg-gray-200 rounded-xl p-4 my-4 shadow-lg'>
                                    {x.title && <Divider style={{ fontSize: '23px', height: '20px', color: theme === 'light' ? "black" : "white" }}  >{x.title}</Divider>}
                                    <Row >
                                        {
                                            x.fields?.map((y: any, index: number) => {
                                                return (

                                                    <Col key={index} className="gutter-row my-1" span={y.col} xs={24} md={12} lg={y.col}>
                                                        <div className='py-1 px-2 font-medium'>{y.label}</div>
                                                        <div style={{ padding: '' }} className='px-2'>{FormComponent(y)}</div>

                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            </Col>

                        )
                    })
                }
            </Row>

        </form>

    )
}

export default FormElement