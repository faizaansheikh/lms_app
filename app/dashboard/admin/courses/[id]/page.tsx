'use client'
import FormElement from '@/app/components/FormElement'
import GridTableForm from '@/app/components/GridTableForm';
import axiosInstance from '@/app/config/axiosInstance';
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

}
function CoursesForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [lessons, setLessons] = useState<any>([])
    const [model, setModel] = useState<model>({
        title: '',
        description: '',
        author: '',
        price: '',
        thumbnail: ''
    })
    // console.log(model);

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
                    col: 14,
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
                    col: 10,
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
                    ChangeEv: (e: React.ChangeEvent<HTMLInputElement>) => {

                        const selectedFile = e.target.files?.[0] || null
                        setFile(selectedFile)
                    },
                    type: 'imageFile',
                    file: file,
                    required: true,
                    validations: {}
                },


            ]
        },

    ]
    const handleSave = async (values: any) => {



        if (!file) {
            return message.error("Please upload thumbnail");
        }


        const formData = new FormData();
        formData.append("thumbnail", file);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("author", values.author);
        formData.append("price", values.price);

        try {
            setLoader(true);
            const res = await axiosInstance.post(`/courses`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            message.success(res?.data?.message);
            router.back()
        } catch (error) {
            console.error(error);
            message.error("Upload failed");
        } finally {
            setLoader(false);
        }

    }

    const handleUpdate = async (values: any) => {
       

        try {
            setLoader(true);


            if (file) {
                const formData = new FormData();

                formData.append("thumbnail", file ? file : values?.thumbnail);
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("author", values.author);
                formData.append("price", values.price);
                const res = await axiosInstance.put(`/courses/${params.id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                message.success(res?.data?.message);
                router.back()
            } else {
                GeneralCoreService('courses').Save({ ...values }, params.id)
                    .then((res) => {
                        if (res?.status === 201) {

                            message.success(res?.data?.message)
                            router.back()
                        } else {
                            message.error('Error updating record')
                        }
                    }).catch((err) => console.log('err', err))
            }


        } catch (error) {
            console.error(error);
            message.error("Upload failed");
        } finally {
            setLoader(false);
        }

    }


    const getSingleRec = (id: number) => {
        setLoader(true)
        GeneralCoreService(`courses`).GetAll(null,id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel({ ...res?.data })
                    setLessons(res?.data?.lessons)
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
            <FormElement title="Course Form" save={params.id === 'new' ? handleSave : handleUpdate} setModel={setModel} model={model} elements={elems} loading={loader} />
           

        </div>
    )
}

export default CoursesForm