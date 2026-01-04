
// import '@ant-design/v5-patch-for-react-19';

import Footer from '@/app/components/ui/Footer';
import Navbar from '@/app/components/ui/Navbar';
import React from 'react'
function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex flex-col min-h-screen">
           
            <header className="sticky top-0 z-50">
                <Navbar dashboard={true}/>
            </header>

         
            <main className="flex-1">
                {children}
            </main>

           
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default layout