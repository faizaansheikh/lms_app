'use client'
import FormElement from '@/app/components/FormElement'
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    course_id: string;
    lesson_id: string;

}
function Lesson_progressForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [lessons, setLessons] = useState<any>([])
    const [course, setCourse] = useState<any>([])
    const [model, setModel] = useState<model>({
        course_id: '',
        lesson_id: ''
    })

    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: '',
            fields: [
                {
                    col: 8,
                    label: 'Course',
                    key: 'course_id',
                    placeholder: 'Add Course',
                    type: 'lookup',
                    multiple: false,
                    formName: 'courses',
                    required: true,

                    vals: params?.id !== 'new' ? params?.id : '',
                    getData: (data: any) => {
                        console.log(data)
                        setCourse(data)
                    },

                },
                {
                    col: 8,
                    label: 'Lessons',
                    key: 'lesson_id',
                    placeholder: 'Add Lessons',
                    type: 'lookup',
                    multiple: true,
                    formName: 'lessons',
                    required: true,

                    vals: params?.id ? lessons : '',
                    getData: (data: any) => {
                        console.log(data)
                        setLessons(data)
                    },

                },


            ]
        },

    ]
    const handleSave = (values: any) => {
        const payload = {
            course_id: course.length ? course[0] : null,
            lesson_id: lessons
        }
        console.log('vals',payload)
        setLoader(true)
        GeneralCoreService('course_lessons').Save(payload, params?.id === 'new' ? '' : course[0])
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
        GeneralCoreService(`course_lessons`).GetAll(null,id)
            .then((res) => {

                if (res?.status === 200) {            
                    setLessons(res?.data?.lessonId)
                    setCourse([res?.data?.courseId])
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
    console.log(course,lessons);
    
    return (
        <div>
            <FormElement title="Add Lessons in Courses" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default Lesson_progressForm