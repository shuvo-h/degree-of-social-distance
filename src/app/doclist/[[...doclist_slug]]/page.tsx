import React from 'react';

// always render this page when user "/docs/*****"
type TProps = {
    params:{doc_slug:string[]}
}
// [[...paramName]] this is used to create a catch all pages of this route. here the double bracket allow to catch the parent routes along with child routes
const CateAllPage = ({params}:TProps) => {
    console.log(params);
    
    return (
        <div>
            CateAllPage
        </div>
    );
};

export default CateAllPage;