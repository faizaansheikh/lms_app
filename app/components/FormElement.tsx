'use client'
import { Col, Divider, Input, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTheme } from 'next-themes';
import XFormHeader from './XFormHeader';
import XLookup from './XLookup';
import XInput from './XInput';
import XSelect from './XSelect';
interface FormElems {
    elements: any,
    setModel: any,
    model: any,
    save: any,
    loading: boolean
}
function FormElement(props: FormElems) {
    const { elements, setModel, model, save, loading } = props
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
        values: { ...model }
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
                        disable={x.disable}
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
            case 'dropdown':
                return <>
                    <XSelect
                        value={x.key}
                        control={control}
                        validations={x.validations}
                        placeholder={x.placeholder}
                        errors={errors}
                        options={x.options}
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
            <div className="relative">

                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-xl">
                        <Spin size="large" />
                    </div>
                )}


                <div className={loading ? 'blur-[1px] pointer-events-none' : ''}>
                    <Row className="pb-6">
                        {elements?.map((x: any, i: number) => (
                            <Col key={i} span={x.col}>
                                <div className="bg-gray-200 rounded-xl p-4 my-4 shadow-lg">
                                    {x.title && (
                                        <Divider
                                            style={{
                                                fontSize: '23px',
                                                height: '20px',
                                                color: theme === 'light' ? 'black' : 'white',
                                            }}
                                        >
                                            {x.title}
                                        </Divider>
                                    )}

                                    <Row>
                                        {x.fields?.map((y: any, index: number) => (
                                            <Col
                                                key={index}
                                                className="gutter-row my-1"
                                                span={y.col}
                                                xs={24}
                                                md={12}
                                                lg={y.col}
                                            >
                                                <div className="py-1 px-2 font-medium">{y.label}</div>
                                                <div className="px-2">{FormComponent(y)}</div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>


        </form>

    )
}

export default FormElement