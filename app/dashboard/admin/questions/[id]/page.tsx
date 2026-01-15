'use client'
import FormElement from '@/app/components/FormElement'
import GridTableForm from '@/app/components/GridTableForm';
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    name: string;
}
function QuestionsForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [ans, setAns] = useState([])
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
                    label: 'Question',
                    key: 'question',
                    placeholder: 'Enter Question',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },

            ]
        },

    ]
    const handleSave = (values: any) => {
        const paylaod = {
            _id:values._id,
            question: values.question,
            answers: JSON.stringify(ans)
        }
        if (ans.length > 0) {

            setLoader(true)
            GeneralCoreService('quiz_questions').Save(paylaod, params?.id === 'new' ? '' : params?.id)
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
        }else{
            message.error('Please add and save answers')
        }

    }
    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`quiz_questions`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel(res?.data)
                    setAns(res?.data?.answers)
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
            <FormElement title="Add Qestions" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
            <GridTableForm
                title="Answers"
                cols={[{ label: "Name", col: 10 }, { label: "Correct", col: 4 }]}
                name="ans"
                defaultValues={{ ans: ans.length ? ans : [{ Name: "", Correct: '' }] }}
                setData={(data: any) => setAns(data)}
                fieldsConfig={[
                    { key: "Name", placeholder: "Name", rules: { required: "Name required" }, col: 10 },
                    {
                        key: "Correct", type: "boolean", placeholder: "Right or wrong", rules: { required: "this field isrequired" }, col: 4,
                        options: [
                            { label: 'Right', value: 'Correct' },
                            { label: 'Wrong', value: 'In-correct' },
                        ]
                    },
                ]}
            />
        </div>
    )
}

export default QuestionsForm