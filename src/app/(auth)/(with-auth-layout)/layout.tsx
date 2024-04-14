import React from 'react';

const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
            <h5 className='bg-pink-200 my-2'>Auth Group route from layout</h5>
            {children}
            <h5 className='bg-pink-200 my-2'>Auth Group route footer from layout</h5>
        </>
    );
};

export default AuthLayout;