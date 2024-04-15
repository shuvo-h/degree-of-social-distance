"use client"
import React from 'react';

const ErrorBoundary = ({error,reset}:{error:Error,reset:()=>void}) => {
    return (
        <div>
            <h2>Products Error Page</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Try Again</button>
        </div>
    );
};

export default ErrorBoundary;