'use client'
import React from 'react'
import { FaPlus } from "react-icons/fa6";
interface Btntype {
    label: string
    icon?: boolean
    Click?: () => void,
    btntype?: any
}
function XButton(props: Btntype) {
    const { label, icon, Click, btntype } = props
    const styles =
        'bg-primary text-white rounded-[25px] px-6 py-3 cursor-pointer hover:bg-[#D73535] duration-200'
    return (
        <button type={btntype ?? 'button'} className={styles} style={{ fontWeight: 100 }} onClick={() => Click ? Click() : {}}>
            {icon && <span className='pr-3'><FaPlus /> </span>}
            {label}
        </button>
    )
}

export default XButton