'use client'
import FormElement from '@/app/components/FormElement'
import GridTableForm from '@/app/components/GridTableForm';
import TiptapEditor from '@/app/components/TiptapEditor';
import axiosInstance from '@/app/config/axiosInstance';
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {

    test: any

}
function Course_Desc_Form() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [course, setCourse] = useState<any>(null)
    const [description, setDescription] = useState("");
    const [model, setModel] = useState<model>({
        test: ''
    })
    console.log(course);

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
               
                {
                    col: 8,
                    label: 'Course',
                    key: 'course',
                    placeholder: 'Add Course',
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

            ]
        },

    ]
    const handleSave = (values: any) => {
        if (course.length) {
            const payload = {
                course_id: course[0],
                description: description
            }
            setLoader(true)
            GeneralCoreService('events').Save(payload, params?.id === 'new' ? '' : params?.id)
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
            message.error('Please select course!')
        }

    }
    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`events`).GetAll(null, id)
            .then((res) => {
                if (res?.status === 200) {
                    
                    setCourse(res?.data?.course_id ? [Number(res?.data?.course_id)] : [])
                    setDescription(res?.data?.description)
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
            <FormElement title="Course Description Form" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
            <TiptapEditor
                value={description}
                onChange={setDescription}
            />

        </div>
    )
}

export default Course_Desc_Form