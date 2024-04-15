import { Metadata } from 'next';
import React from 'react';

type TProps = {
    params : {
        product_id: string
    }
}

export const generateMetadata = async({params}:TProps):Promise<Metadata>=>{
    const generatedTitle:string = await new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`iPhone ${params.product_id} meta title`)
        },1000)
    })
    return {
        title: `Product ${generatedTitle}`,
    }
}

const ProductDetails = ({params}:TProps) => {
    
    return (
        <div>
            <h2>Product details for {params.product_id}</h2>
        </div>
    );
};

export default ProductDetails;