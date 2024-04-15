'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navLinks = [
    {name:"Register", href:"/register"},
    {name:"Login", href:"/login"},
    {name:"Forgot Password", href:"/forgot-password"},
    {name:"Products", href:"/products"},
    {name:"Docs", href:"/docs"},
    {name:"Doc List", href:"/doclist"},
    {name:"Order", href:"/order"},
    {name:"complex-dashboard", href:"/complex-dashboard"},
]
const Navbar = () => {
    const pathName = usePathname(); // only works on client side 


    return (
        <div>
            {
                navLinks.map(link=>{
                    const isActive = pathName.startsWith(link.href)
                    return <Link href={link.href} legacyBehavior key={link.name}>
                        <a className={`px-2 hover:bg-blue-400 ${isActive ? "text-blue-500":""}`}>{link.name}</a>
                    </Link>
                })
            }
        </div>
    );
};

export default Navbar;