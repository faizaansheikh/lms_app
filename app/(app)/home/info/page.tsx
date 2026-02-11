
import AboutRefundPage from '@/app/components/AboutRefundPage'
import React, { Suspense } from 'react'

function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutRefundPage />
        </Suspense>

    )
}

export default page