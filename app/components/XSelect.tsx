import React from 'react';
import { Select, Space } from 'antd';
import { Controller } from 'react-hook-form';
interface select {
    value: any
    control: any
    validations: any
    placeholder: any
    errors: any,
    options: any
}


const XSelect = (props: select) => {
    const { value, control, validations, placeholder, errors, options } = props
    return (
        <>
            <Controller
                name={value}
                control={control}
                rules={{ ...validations }}
                render={({ field }) => (
                    <Select
                        {...field}
                        // mode="multiple"
                        style={{ width:'100%',padding: '8px', fontSize: '16px', background: '#F5F5F0' }}
                        aria-invalid={errors[value] ? true : false}
                        placeholder={placeholder}
                        // defaultValue={['happy']}
                        // onChange={(value) => {
                        //     console.log(`selected ${value}`);
                        // }}
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {`${option.data.label} (${option.data.desc})`}
                            </Space>
                        )}
                    />

                )}
            />

            {
                errors[value] && <p className='text-red-600' role='alert'>{errors[value]?.message as string}</p>
            }
        </>


    )
}

export default XSelect;