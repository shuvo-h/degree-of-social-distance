"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const Order = () => {
    const router = useRouter();

    const onClickHandler = () =>{
        // router.push("/login")
        
    }
    return (
        <div>
            <button onClick={onClickHandler}>Order Now</button>
        </div>
    );
};

export default Order;