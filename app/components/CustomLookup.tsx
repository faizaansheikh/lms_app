'use client'
import React, { useState, useEffect } from 'react';
import { CiViewTable } from 'react-icons/ci';
import { GeneralCoreService } from '../config/GeneralCoreService';
import { useParams } from 'next/navigation';

interface LookupInputProps {
    value?: number[] | string; // accepts [1,3] OR "[1,3]"
    onChange?: (ids: number[]) => void;
    getData?: (ids: number[]) => void;
    multiple?: boolean;
    formName: string;
    id: boolean
}

/* ===================== LookupInput ===================== */
const LookupInput: React.FC<LookupInputProps> = ({
    value = [],
    onChange,
    getData,
    multiple = true,
    formName,
    id
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [inputValue, setInputValue] = useState('');
    const [column, setColumn] = useState<string[]>([]);
    const [rowData, setRowData] = useState<any[]>([]);
   
    useEffect(() => {
          if (!value) return
        let ids: number[] = [];

        if (typeof value === 'string') {
            
            try {
                ids = JSON.parse(value);
            } catch {
                ids = [];
            }
        } else if (Array.isArray(value)) {
            ids = value;
        }

        setSelectedIds(ids);
    }, [value]);

    /* -------- Fetch all records -------- */
    const getAllRec = async () => {
        try {
            const res = await GeneralCoreService(formName).GetAll();
            const data = res?.data || [];

            setRowData(data);
            setColumn(data.length > 0 ? Object.keys(data[0]) : []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLookup = () => {
        setModalOpen(true);
        getAllRec();
    };

    /* -------- Select / Deselect -------- */
    const toggleSelect = (id: number) => {
        if (multiple) {
            setSelectedIds((prev:any) =>
                prev.includes(id) ? prev.filter((i:any) => i !== id) : [...prev, id]
            );
        } else {
            setSelectedIds([id]);
        }
    };

    /* -------- Save -------- */
    const handleSave = () => {
        setModalOpen(false);
        getData?.(selectedIds);
    };

    /* -------- Update input text -------- */
    useEffect(() => {
        if (!rowData.length) return;

        const titles = rowData
            .filter(item => selectedIds.includes(item._id))
            .map(item => item.title)
            .join(',');

        setInputValue(prev => (prev !== titles ? titles : prev));
    }, [selectedIds, rowData]);

    return (
        <div className="relative w-full">
            {/* Input */}
            <input
                type="text"
                value={inputValue}
                readOnly
                className="w-full bg-amber-50 border border-blue-200 p-2 pr-10 text-[16px] rounded-md"
            />

            {/* Icon */}
            <div className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
                <CiViewTable size={20} onClick={handleLookup} />
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white w-[50%] max-h-[80vh] overflow-auto rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Select Items</h2>

                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 font-bold text-[14px]">
                                        {multiple ? 'Select' : 'Pick'}
                                    </th>
                                    {column.map((col, i) => (
                                        <th key={i} className="p-3 font-bold text-[14px]">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {rowData.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleSelect(item._id)}
                                    >
                                        <td className="p-2 border text-center">
                                            {multiple ? (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(item._id)}
                                                    readOnly
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="singleSelect"
                                                    checked={selectedIds.includes(item._id)}
                                                    readOnly
                                                />
                                            )}
                                        </td>

                                        {column.map((col, j) => (
                                            <td key={j} className="p-2 border">
                                                {String(item[col])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ===================== CustomLookup Wrapper ===================== */
const CustomLookup = (props: any) => {
    const { getData, formName, multiple, vals } = props;
    const params = useParams()
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
   
    return (
        <div className="p-0">
            <LookupInput
                id={params.id !== 'new'}
                value={vals}
                onChange={setSelectedIds}
                getData={getData}
                multiple={multiple}
                formName={formName}
            />
        </div>
    );
};

export default CustomLookup;
