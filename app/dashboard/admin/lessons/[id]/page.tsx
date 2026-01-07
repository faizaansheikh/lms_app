'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    title: string;
    url: string;
    quizId: string;

}
function LessonsForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState(null);
    const [model, setModel] = useState<model>({
        title: '',
        url: '',
        quizId: ''
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 12,
                    label: 'Title',
                    key: 'title',
                    placeholder: 'Enter Lesson Title',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 12,
                    label: 'URL',
                    key: 'url',
                    placeholder: 'Enter video id',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 12,
                    label: 'Quiz',
                    key: 'quizId',
                    placeholder: 'Select Quiz',
                    ChangeEv: () => { },
                    type: 'lookup'
                },

            ]
        },

    ]
    const handleSave = (values: any) => {
        setLoader(true)
        GeneralCoreService('lessons').Save(values, params?.id === 'new' ? '' : params?.id)
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
        GeneralCoreService(`lessons`).GetAll(id)
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
            <FormElement title="Lessons Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default LessonsForm