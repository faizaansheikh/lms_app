"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Input, Button, InputNumber } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

type GridTableFormProps = {
    title: string;
    cols: string[];
    name: string;
    defaultValues: any;
    setData: (data: any) => void;
};

export default function GridTableForm({
    title,
    cols,
    name,
    defaultValues,
    setData,
}: GridTableFormProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const onSubmit = (data: any) => {
        setData(data[name]);
    };

    return (
        <div className="w-full bg-gray-50 rounded-xl p-4 my-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                {/* HEADER */}
                <Row gutter={16} className="font-semibold text-sm mb-2">
                    {cols.map((col: string, i: number) => (
                        <Col key={i} xs={24} sm={8} md={6}>
                            {col}
                        </Col>
                    ))}

                </Row>

                {/* ROWS */}
                {fields.map((item: any, index) => (
                    <Row gutter={16} key={item.id} className="mb-2 items-start">

                        <Col xs={24} sm={8} md={6}>
                            <Controller
                                name={`${name}.${index}.title`}
                                control={control}
                                defaultValue={item.title || ""}
                                rules={{
                                    required: "Title required",
                                    minLength: { value: 3, message: "Min 3 characters" },
                                }}
                                render={({ field }) => <Input {...field} placeholder="Title" />}
                            />
                            <p className="text-red-500 text-xs mt-1 h-0">
                                {(errors as any)?.[name]?.[index]?.title?.message}
                            </p>
                        </Col>


                        <Col xs={24} sm={8} md={4}>
                            <Controller
                                name={`${name}.${index}.duration`}
                                control={control}
                                defaultValue={item.duration || 0}
                                rules={{ required: "Duration required" }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        min={0}
                                        placeholder="Duration"
                                        className="w-full"
                                        onChange={(value) => field.onChange(value ?? 0)}
                                    />
                                )}
                            />
                            <p className="text-red-500 text-xs mt-1 h-0">
                                {(errors as any)?.[name]?.[index]?.duration?.message}
                            </p>
                        </Col>

                        {/* URL */}
                        <Col xs={24} sm={8} md={8}>
                            <Controller
                                name={`${name}.${index}.url`}
                                control={control}
                                defaultValue={item.url || ""}
                                rules={{ required: "URL required" }}
                                render={({ field }) => <Input {...field} placeholder="URL" />}
                            />
                            <p className="text-red-500 text-xs mt-1 h-0">
                                {(errors as any)?.[name]?.[index]?.url?.message}
                            </p>
                        </Col>

                        {/* ACTION */}
                        <Col xs={24} sm={24} md={6} className="flex gap-0 items-center ">
                            <div className="flex items-center gap-1">
                                {fields.length > 1 && (
                                    <CiCircleMinus
                                        size={28}
                                        className="text-red-600 cursor-pointer hover:text-red-500"
                                        onClick={() => remove(index)}
                                    />
                                )}
                                <IoIosAddCircle
                                    size={32}
                                    className="text-green-600 cursor-pointer hover:text-green-500"
                                    onClick={() => append({ title: "", duration: "", url: "" })}
                                />
                            </div>
                        </Col>
                    </Row>
                ))}

                <Button type="primary" htmlType="submit" className="mt-4 w-full md:w-auto">
                    Save
                </Button>
            </form>
        </div>
    );
}
