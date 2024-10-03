

import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <div>
            <header className="text-gray-600 body-font shadow-md fixed w-full top-0 left-0 mb-10 z-50 bg-white">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>

                        <span className="ml-3 text-2xl font-bold">Ecommerce Stock Management</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center justify-center font-semibold text-2xl">
                        {/* <a className="mr-5 hover:text-gray-900">Home</a> */}
                        <Link href="/" className="mr-5 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/components/product" className="mr-5 hover:text-gray-900">
                            Product
                        </Link>
                        <Link href="/components/search" className="mr-5 hover:text-gray-900">
                            Search
                        </Link>
                    </nav>
                    <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold text-xl">
                        Login
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Navbar;

