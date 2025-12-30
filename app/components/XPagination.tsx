'use client'
import React from 'react';
import { Pagination } from 'antd';

const XPagination: React.FC = () => <Pagination className=' bg-gray-300 hover:text-red-400 rounded-xl' style={{padding:'10px 20px'}} defaultCurrent={6} total={500} />;

export default XPagination;