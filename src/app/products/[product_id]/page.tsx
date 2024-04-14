import React from 'react';

type TProps = {
    params : {
        product_id: string
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