'use client'
import FormElement from '@/app/components/FormElement'
import GridTableForm from '@/app/components/GridTableForm';
import axiosInstance from '@/app/config/axiosInstance';
import { GeneralCoreService } from '@/app/config/GeneralCoreService';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface model {
    course_id: string;
    url: string;

}
function CertificateForm() {
    const params = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [course, setCourse] = useState<any>([])
    const [model, setModel] = useState<model>({
        course_id: '',
        url: ''
    })
    // console.log(model);

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
                    vals: params?.id !== 'new' ? course : '',
                    getData: (data: any) => {
                        setCourse(data)
                    },

                },
                {
                    col: 24,
                    label: 'Cerificate',
                    key: 'url',
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
        const course_id = course.length ? course[0] : null


        if (!file) {
            return message.error("Please upload certificate");
        }


        const formData = new FormData();
        formData.append("url", file);
        formData.append("course_id", course_id);

        try {
            setLoader(true);
            const res = await axiosInstance.post(`/certificate`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            if (res.status === 201) {
                router.back()
                message.success(res?.data?.message);
            } else {
                message.warning(res?.data?.message);
            }

        } catch (error: any) {

            message.error(error.message);
        } finally {
            setLoader(false);
        }

    }

    const handleUpdate = async (values: any) => {


        try {

            setLoader(true);


            if (file) {
                const formData = new FormData();

                formData.append("url", file ? file : values?.url);
                formData.append("course_id", values?.course_id);

                const res = await axiosInstance.put(`/certificate/${params.id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                message.success(res?.data?.message);
                router.back()
            } else {
                GeneralCoreService('certificate').Save({ ...values }, params.id)
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
        GeneralCoreService(`certificate`).GetAll(null, id)
            .then((res) => {

                if (res?.status === 200) {
                    setModel({ ...res?.data })
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
            <FormElement title="Course Form" save={params.id === 'new' ? handleSave : handleUpdate} setModel={setModel} model={model} elements={elems} loading={loader} />


        </div>
    )
}

export default CertificateForm