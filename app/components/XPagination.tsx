'use client'
import React from 'react';
import { Pagination } from 'antd';

const XPagination = ({ totalCount, page, setPage, setRowsPerPage }: any) => {
    const onShowSizeChange = (current: any, pageSize: any) => {
        setPage(current, pageSize);
        setRowsPerPage(pageSize);

    };
    const handleChange = (page: any) => {
        setPage(page);
    };

    return (
        <Pagination
            className=' bg-gray-300 hover:text-red-400 rounded-xl py-3'
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={(e) => handleChange(e)}
            defaultCurrent={page}
            total={totalCount}
        />

    )
}

export default XPagination;