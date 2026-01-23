'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    name: string;
    review: string
}
function ReviewsForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [ques, setQues] = useState([])
    const [course, setCourse] = useState<any>(null)
    const [model, setModel] = useState<model>({
        name: '',
        review: ''
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 10,
                    label: 'Select Course',
                    key: 'course',
                    placeholder: 'Select Course',
                    type: 'lookup',
                    multiple: false,
                    formName: 'courses',
                    required: true,
                    display: 'name',
                    vals: params?.id !== 'new' ? course : '',
                    getData: (data: any) => {
                        setCourse(data)
                    },

                },
                {
                    col: 10,
                    label: 'Name',
                    key: 'name',
                    placeholder: 'Enter User Name',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 2,
                    label: 'Add rating',
                    key: 'rating',
                    placeholder: 'Select Rating',
                    type: 'dropdown',
                    required: true,
                    options: [
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 }
                    ]
                },
                {
                    col: 24,
                    label: 'Write Review',
                    key: 'review',
                    placeholder: 'Review',
                    ChangeEv: () => { },
                    type: 'textarea',
                    validations: {
                        required: { value: true, message: 'Please fill this field' }
                    }
                },


            ]
        },

    ]
    const handleSave = (values: any) => {
        if (course.length) {
            const payload = {
                ...values,
                course_id: course[0]
            }
         
            setLoader(true)
            GeneralCoreService('reviews').Save(payload, params?.id === 'new' ? '' : params?.id)
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
        } else {
            message.error('Please select course')
        }

    }
    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`reviews`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel(res?.data)
                    setCourse([res?.data?.course_id])
                } else {
                    message.error(res?.message)
                }
            })
            .catch((err) => console.log('error', err))
            .finally(() => setLoader(false))
    }



    useEffect(() => {
        if (params.id !== 'new') {
         

            getSingleRec(Number(params.id))
        }
    }, [])
    return (
        <div>
            <FormElement title="Quiz Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default ReviewsForm