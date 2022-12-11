import * as React from 'react';
import { LayoutProps } from '@/models/index';
import Link from 'next/link'


export function EmptyLayout({ children }: LayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}
