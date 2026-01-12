'use client'

import { Spin } from "antd"

function Xloader({ loading }: any) {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 rounded-xl" >
            <Spin size="large" />
        </div >
    )
}

export default Xloader