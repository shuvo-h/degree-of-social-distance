import { notFound } from 'next/navigation';
import React from 'react';

type TProps = {
    params:{
        product_id: string,
        review_id: string,
    }
}
const ReviewSingle = ({params}:TProps) => {
    console.log(params);

    // id review not exist, the return the not found page
    // to test, if review id is > 1000, then go to notFound page
    if (parseInt(params.review_id) > 1000) {
        notFound();
    }
    
    return (
        <div>
            <h2>Review {params.review_id} of product {params.product_id} </h2>
        </div>
    );
};

export default ReviewSingle;