'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    name: string;
}
function QuizForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [ques, setQues] = useState([])
    const [model, setModel] = useState<model>({
        name: '',
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 24,
                    label: 'Name',
                    key: 'name',
                    placeholder: 'Enter Quiz Name',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },

                {
                    col: 24,
                    label: 'Questions',
                    key: 'questions',
                    placeholder: 'Add Questions',
                    type: 'lookup',
                    multiple: true,
                    formName: 'quiz_questions',
                    required: true,
                    display: 'title',
                    vals: params?.id !== 'new' ? ques : '',
                    getData: (data: any) => {
                        setQues(data)
                    },

                },
                
            ]
        },

    ]
    const handleSave = (values: any) => {
        const payload = {
            ...values,
            questions: ques
        }
        setLoader(true)
        GeneralCoreService('quiz').Save(payload, params?.id === 'new' ? '' : params?.id)
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
        GeneralCoreService(`quiz`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel(res?.data)
                    setQues(res?.data?.questions)
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
            <FormElement title="Quiz Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default QuizForm