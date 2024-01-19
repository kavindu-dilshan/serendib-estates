import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-200 shadow-md">
        <div className="w-full max-w-6xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
                        <span className='text-slate-500'>Serendib</span>
                        <span className='text-slate-600'>Estates</span>
                    </h1>
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-500 sm:mb-0">
                    <li>
                        <Link to='/' className="hover:text-slate-900 me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link to='/about' className="hover:text-slate-900 me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link to='/sign-in' className="hover:text-slate-900 me-4 md:me-6">Sign In</Link>
                    </li>
                    <li>
                        <Link to='/sign-up' className="hover:text-slate-900">Sign Up</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-slate-400 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-slate-500 sm:text-center">© 2024 <Link to='/' className="hover:text-slate-900">SerendibEstates</Link>™. All Rights Reserved.</span>
        </div>
    </footer>
  )
}