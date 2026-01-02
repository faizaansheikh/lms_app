'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface model {
    name: string;
    email: string;
    password: string;
    role: string;

}
function UsersForm() {
    const [loader, setLoader] = useState(false)
    const router = useRouter()

    const [model, setModel] = useState<model>({
        name: '',
        email: '',
        password: '',
        role: '',
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 12,
                    label: 'Name',
                    key: 'name',
                    placeholder: 'Enter Your Name',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 12,
                    label: 'Email',
                    key: 'email',
                    placeholder: 'Enter Your email',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true,
                    validations: {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                        maxLength: {
                            value: 50,
                            message: "Email cannot exceed 50 characters",
                        },
                    }
                },
                {
                    col: 12,
                    label: 'Password',
                    key: 'password',
                    placeholder: 'Enter Your password',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true,
                    validations: {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        },

                    }
                },
                {
                    col: 12,
                    label: 'Role',
                    key: 'role',
                    placeholder: 'Select role',
                    ChangeEv: () => { },
                    options: [
                        {
                            label: 'Admin',
                            value: 'admin',
                        },
                        {
                            label: 'Student',
                            value: 'student'
                        }
                    ],
                    type: 'dropdown',
                    validations: {
                        required: { value: true, message: 'Please select this field' }
                    },
                    required: true
                }
            ]
        },

    ]
    const handleSave = (values: any) => {
        setLoader(true)
        GeneralCoreService('users/register').Save(values)
            .then((res) => {

                if (res?.status === 201) {

                    message.success(res?.message)
                    router.back()
                } else {
                    message.error(res?.message)
                }
            })
            .catch((err) => console.log('error', err))
            .finally(() => setLoader(false))
    }
    return (
        <div>
           <FormElement save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader}/>
        </div>
    )
}

export default UsersForm