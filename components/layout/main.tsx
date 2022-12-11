import React, { useEffect } from 'react';
import { LayoutProps } from '@/models/index';
import Link from 'next/link'
import { Header, Footer, Sidebar } from '@/components/common'

export interface MainLayoutProps {
}

export function MainLayout({ children }: LayoutProps) {

    useEffect(() => {
        console.log('Main Layout mounting')
        return () => console.log('Main Layout UNmounting')
    }, [])

    return (
        <div>
            <Header />

            <div className="row">
                <div className="leftcolumn">
                    {children}
                </div>

                <Sidebar />
            </div>

            <Footer />
        </div>
    );
}
