import Link from 'next/link';
import React from 'react';

const Products = () => {
    const productList = [1,2,3,4,5,6]
    return (
        <div className='text-blue-700'>
            Products
            <ul>
                {
                    productList.map(el=><Link href={`/products/${el}`} legacyBehavior><a className='block'>product {el}</a></Link>)
                }
            </ul>
        </div>
    );
};

export default Products;