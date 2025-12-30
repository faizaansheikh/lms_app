'use client'
import FormElement from '@/app/components/FormElement'
import React, { useEffect, useState } from 'react'

interface model {
    name: string;
    email: string;
    phone: string;
    address: string;

}
function UsersForm() {
    const [model, setModel] = useState<model>({
        name: '',
        email: '',
        phone: '',
        address: '',
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
                    type: 'lookup',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 12,
                    label: 'Email',
                    key: 'email',
                    placeholder: 'Enter Your Name',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true
                },
                {
                    col: 12,
                    label: 'Phone',
                    key: 'phone',
                    placeholder: 'Enter Your Name',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true
                },
                {
                    col: 12,
                    label: 'Address',
                    key: 'address',
                    placeholder: 'Enter Your Name',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true
                }
            ]
        },
 
    ]
    const handleSave = (d: any) => {
        console.log('d', d);
    }
    return (
        <div>
            <FormElement save={handleSave} setModel={setModel} model={model} elements={elems} />
        </div>
    )
}

export default UsersForm