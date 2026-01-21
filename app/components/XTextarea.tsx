
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from 'antd';

const { TextArea } = Input;

interface input {
    value: any
    control: any
    validations: any
    placeholder: any
    errors: any,
    disable: boolean
}
function XTextarea(props: input) {
    const { value, control, validations, placeholder, errors, disable } = props
    return (
        <>
            <Controller
                name={value}
                control={control}
                rules={{ ...validations }}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        placeholder={placeholder}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        style={{ padding: '8px', fontSize: '16px', background: '#F5F5F0' }}
                        aria-invalid={errors[value] ? true : false}
                    />
                    // <Input
                    //     {...field}
                    //     disabled={disable}
                    //     placeholder={placeholder}
                    //     style={{ padding: '8px', fontSize: '16px', background: '#F5F5F0' }}
                    //     aria-invalid={errors[value] ? true : false}
                    // />

                )}
            />

            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            }
        </>
    )
}

export default XTextarea