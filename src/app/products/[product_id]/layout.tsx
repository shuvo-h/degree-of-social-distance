import React from 'react';

const ProductDetailsLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
            <h5 className='bg-pink-200 my-2'>Product carosole from layout</h5>
            {children}
            <h5 className='bg-pink-200 my-2'>Product Review from layout</h5>
        </>
    );
};

export default ProductDetailsLayout;