'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    title: string;
    description: string;
    author: string;
    price: string;
    thumbnail: string;
    lessons: string;

}
function CoursesForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState(null);
    const [model, setModel] = useState<model>({
        title: '',
        description: '',
        author: '',
        price: '',
        thumbnail: '',
        lessons: '',
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 24,
                    label: 'Title',
                    key: 'title',
                    placeholder: 'Enter course title',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },

                {
                    col: 12,
                    label: 'Author',
                    key: 'author',
                    placeholder: 'Course author',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true,
                    // disable: params.id !== 'new',
                    validations: {}
                },
                {
                    col: 12,
                    label: 'Price',
                    key: 'price',
                    placeholder: 'Course Price',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true,
                    // disable: params.id !== 'new',
                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        // minLength: { value: 2, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 24,
                    label: 'Description',
                    key: 'description',
                    placeholder: 'Course description',
                    ChangeEv: () => { },
                    type: 'input',
                    required: true,
                    validations: {}
                },
                {
                    col: 8,
                    label: 'Thumbnail',
                    key: 'thumbnail',
                    placeholder: 'Course description',
                    ChangeEv: () => { },
                    type: 'imageFile',
                    required: true,
                    validations: {}
                },

                // {
                //     col: 12,
                //     label: 'Role',
                //     key: 'role',
                //     placeholder: 'Select role',
                //     ChangeEv: () => { },
                //     options: [
                //         {
                //             label: 'Admin',
                //             value: 'admin',
                //         },
                //         {
                //             label: 'Student',
                //             value: 'student'
                //         }
                //     ],
                //     type: 'dropdown',
                //     validations: {
                //         required: { value: true, message: 'Please select this field' }
                //     },
                //     required: true
                // }
            ]
        },

    ]
    const handleSave = (values: any) => {
        setLoader(true)
        GeneralCoreService('users/register').Save(values, params?.id === 'new' ? '' : params?.id)
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
    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`users`).GetAll(id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel(res?.data)
                } else {
                    message.error(res?.message)
                }
            })
            .catch((err) => console.log('error', err))
            .finally(() => setLoader(false))
    }



    useEffect(() => {
        if (params.id !== 'new') {
            console.log('id ');

            getSingleRec(Number(params.id))
        }
    }, [])
    return (
        <div>
            <FormElement title="Course Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default CoursesForm