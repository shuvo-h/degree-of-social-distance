import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title:"Pre template title"
}
const page = () => {
    return (
        <div>
            Login Page
        </div>
    );
};

export default page;