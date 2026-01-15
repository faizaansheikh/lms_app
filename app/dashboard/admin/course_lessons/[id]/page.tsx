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
function Course_lessonsForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [lessons, setLessons] = useState<any>([])
    const [course, setCourse] = useState<any>([])
    const [quiz, setQuiz] = useState<any>([])
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
                    display: 'title',
                    vals: params?.id !== 'new' ? [params?.id] : '',
                    getData: (data: any) => {
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
                    display: 'title',
                    vals: params?.id !== 'new' ? lessons : '',
                    getData: (data: any) => {
                        setLessons(data)
                    },

                },
                {
                    col: 8,
                    label: 'Final Exam Quiz',
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


            ]
        },

    ]
    const handleSave = (values: any) => {
        if (lessons.length === 0 && course.length === 0 && quiz.length === 0) {
            message.warning('Please select all fields')
        } else {
            const payload = {
                course_id: course.length ? course[0] : null,
                lesson_id: lessons,
                quizid: quiz.length ? quiz[0] : null,
            }

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
    }
    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`course_lessons`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setLessons(res?.data?.lessonId)
                    setCourse([res?.data?.courseId])
                    setQuiz(res?.data?.quizId ? [Number(res?.data?.quizId)] : [])
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
    console.log(course, lessons, quiz);

    return (
        <div>
            <FormElement title="Add Lessons in Courses" save={handleSave} setModel={setModel} model={model} elements={elems} loading={loader} />
        </div>
    )
}

export default Course_lessonsForm