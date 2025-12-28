import { Input } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'


interface lookup {
    value: any
    control: any
    validations: any
    placeholder: any
    errors: any
}
function XInput(props: lookup) {
    const { value, control, validations, placeholder, errors } = props
    return (
        <>
            <Controller
                name={value}
                control={control}
                rules={{ ...validations }}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={placeholder}
                        style={{ padding: '8px', fontSize: '16px', background: '#F5F5F0' }}
                        aria-invalid={errors[value] ? true : false}
                    />

                )}
            />

            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            }
        </>
    )
}

export default XInput