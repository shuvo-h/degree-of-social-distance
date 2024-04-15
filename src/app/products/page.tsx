"use client"
import Link from 'next/link';
import React from 'react';
const getRandomNumber = (count:number)=>{
    return Math.floor(Math.random()*count)
}
/*
export const metadata ={
    title:"This is products page",
}
*/
const Products = () => {
    const productList = [1,2,3,4,5,6]

    // create a intentional error to test error page loading
    const random = getRandomNumber(2);
    console.log({random});
    if (random === 1) {
        console.log({random});
        
        throw new Error("Error page loading Test Crated Error")
    }
    return (
        <div className='text-blue-700'>
            Products
            <ul>
                {
                    productList.map((el,idx)=><Link 
                        href={`/products/${el}`} 
                        legacyBehavior
                        key={idx}
                        >
                            <a className='block'>product {el}</a>
                        </Link>)
                }
            </ul>
        </div>
    );
};

export default Products;