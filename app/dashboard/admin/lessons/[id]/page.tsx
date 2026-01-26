'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    title: string;
    url: string;
    type: string

}
function LessonsForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState(null);
    const [quiz, setQuiz] = useState<any>([]);

    const [model, setModel] = useState<model>({
        title: '',
        url: '',
        type: ''
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
                    label: 'Lesson Quiz',
                    key: 'quiz',
                    placeholder: 'Select Quiz',
                    type: 'lookup',
                    multiple: false,
                    formName: 'quiz',
                    required: true,
                    display: 'name',
                    vals: params?.id !== 'new' ? quiz : '',
                    getData: (data: any) => {
                        setQuiz(data)
                    },

                },
                {
                    col: 24,
                    label: 'Description',
                    key: 'outline',
                    placeholder: 'Write Lesson Overview',
                    type: 'textarea',
                },


            ]
        },

    ]
    const handleSave = (values: any) => {
        const payload = {
            ...values,
            quizid: quiz?.length > 0 ? quiz[0] : null
        }
        // console.log(payload)
        setLoader(true)
        GeneralCoreService('lessons').Save(payload, params?.id === 'new' ? '' : params?.id)
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
        GeneralCoreService(`lessons`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel(res?.data)
                    setQuiz(res?.data?.quizid ? [Number(res?.data?.quizid)] : [])
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

            <FormElement title="Lessons Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default LessonsForm