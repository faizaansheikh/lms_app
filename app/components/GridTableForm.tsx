"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Input, InputNumber, Button } from "antd";
import { IoIosAddCircle } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import XLookup from "./XLookup";

export default function GridTableForm({
    title,
    cols,
    fieldsConfig,
    name,
    defaultValues,
    setData
}: any) {
  

    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues,

    });

    const { fields, append, remove, replace } = useFieldArray({ control, name });
    useEffect(() => {
        if (defaultValues?.[name]?.length) {
            replace(defaultValues[name]);
        }
    }, [defaultValues, name, replace]);
    const onSubmit = (data: any) => setData(data[name]);

    return (
        <div className="w-full bg-gray-200 rounded-xl p-3 my-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 px-3 pt-4">{title}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
                {/* HEADER */}
                <Row gutter={16} className="font-semibold text-sm mb-2">
                    {cols.map((col: any, i: any) => (
                        <Col key={i} xs={24} sm={8} md={col?.col}>{col?.label}</Col>
                    ))}

                </Row>

                {/* ROWS */}
                {fields?.map((item: any, index) => (
                    <Row gutter={16} key={item.id} className="mb-2 items-start">
                        {fieldsConfig.map((field: any) => (
                            <Col key={field.key} xs={24} sm={8} md={field.col}>
                                <Controller
                                    name={`${name}.${index}.${field.key}`}
                                    control={control}
                                    defaultValue={item[field.key] ?? (field.type === "number" ? 0 : "")}
                                    rules={field.rules || {}}
                                    render={({ field: controllerField }) =>
                                        field.type === "numbser" ? (
                                            <InputNumber
                                                {...controllerField}
                                                placeholder={field.placeholder}
                                                min={0}
                                                className="w-full"
                                                onChange={(value) => controllerField.onChange(value ?? 0)}
                                                style={{ width: '100%', padding: '7px', fontSize: '10px', background: '#F5F5F0' }}
                                            />
                                        ) : field.type === 'lookup' ?
                                            <XLookup
                                                value={field.key}
                                                control={control}
                                                validations={field.rules}
                                                placeholder={field.placeholder}
                                                errors={errors}
                                            />
                                            : (
                                                <Input
                                                    {...controllerField}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    style={{ padding: '7px', fontSize: '14px', background: '#F5F5F0' }}
                                                />
                                            )
                                    }
                                />
                                <p className="text-red-500 text-xs mb-1">
                                    {(errors as any)?.[name]?.[index]?.[field.key]?.message}
                                </p>
                            </Col>
                        ))}

                        {/* ACTION */}
                        <Col xs={24} sm={24} md={2} className="flex gap-2 items-center mt-0">
                            <div className="flex items-center">
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
                                    onClick={() => {
                                        const newObj: any = {};
                                        fieldsConfig.forEach((f: any) => {
                                            newObj[f.key] = f.type === "number" ? 0 : "";
                                        });
                                        append(newObj);
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                ))}

                <Button type="primary" htmlType="submit" className="mt-4 w-full md:w-auto">
                    Save Changes
                </Button>
            </form>
        </div>
    );
}
