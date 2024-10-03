"use client"
import React from 'react'
import { useState, useEffect } from 'react'
// import "./globals.css";
import { global } from 'styled-jsx/css';


const page = () => {
    const [productForm, setProductForm] = useState({})
    const [products, setProducts] = useState([])
    const [alert, setAlert] = useState("")
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingaction, setLoadingaction] = useState(false)
    const [dropdown, setDropdown] = useState([])
    useEffect(() => {
        // Fetch products on load 
        const fetchProducts = async () => {
            const response = await fetch('/api/product')
            let rjson = await response.json()
            setProducts(rjson.products)
        }
        fetchProducts()
    }, [])

    const onDropdownEdit = async (e) => {
        let value = e.target.value
        setQuery(value)
        // if (value.length > 3) {
        setLoading(true)
        setDropdown([])
        const response = await fetch('/api/search?query=' + query)
        let rjson = await response.json()
        setDropdown(rjson.products)
        setLoading(false)
        // }
        // else {
        // setDropdown([])
        // }
    }
    const buttonAction = async (action, slug, initialQuantity) => {
        // Immediately change the quantity of the product with given slug in Products
        let index = await products.findIndex((item) => item.slug == slug)
        let newProducts = await JSON.parse(JSON.stringify(products))
        if (action == "plus") {
            newProducts[index].quantity = parseInt(initialQuantity) + 1
        }
        else {
            newProducts[index].quantity = parseInt(initialQuantity) - 1
        }
        setProducts(newProducts)

        // Immediately change the quantity of the product with given slug in Dropdown
        let indexdrop = dropdown.findIndex((item) => item.slug == slug)
        let newDropdown = JSON.parse(JSON.stringify(dropdown))
        if (action == "plus") {
            newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1
        }
        else {
            newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1
        }
        setDropdown(newDropdown)

        setLoadingaction(true)
        const response = await fetch('/api/action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, slug, initialQuantity })
        });
        let r = await response.json()
        setLoadingaction(false)
    }
    return (
        // <div className="container mx-auto my-8 mt-40 p-8 rounded-md bg-gradient-to-r from-purple-100 to-purple-300 shadow-lg">
        //     <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Search a Product</h1>
        //     <div className="flex mb-4">
        //         <input
        //             onChange={onDropdownEdit}
        //             type="text"
        //             placeholder="Enter a product name"
        //             className="flex-1 border-2 border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 shadow-md bg-white text-black" // Changed text color to black
        //         />
        //         <select className="flex-shrink-0 border-2 border-gray-300 px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 shadow-md bg-white text-black">
        //             <option value="">All</option>
        //             <option value="category1">Price</option>
        //             <option value="category2">Quantity</option>
        //             {/* Add more options as needed */}
        //         </select>
        //     </div>
        //     {loading && (
        //         <div className='flex justify-center items-center mb-4'>
        //             {/* <img width={74} src="/loading.svg" alt="Loading" /> */}

        //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g>
        //                 <circle fill="#e15b64" r="4" cy="50" cx="60">
        //                     <animate begin="-0.67s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
        //                     <animate begin="-0.67s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
        //                 </circle>
        //                 <circle fill="#e15b64" r="4" cy="50" cx="60">
        //                     <animate begin="-0.33s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
        //                     <animate begin="-0.33s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
        //                 </circle>
        //                 <circle fill="#e15b64" r="4" cy="50" cx="60">
        //                     <animate begin="0s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
        //                     <animate begin="0s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
        //                 </circle>
        //             </g><g transform="translate(-15 0)">
        //                     <path transform="rotate(90 50 50)" fill="#f8b26a" d="M50 50L20 50A30 30 0 0 0 80 50Z"></path>
        //                     <path fill="#f8b26a" d="M50 50L20 50A30 30 0 0 0 80 50Z">
        //                         <animateTransform keyTimes="0;0.5;1" values="0 50 50;45 50 50;0 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        //                     </path>
        //                     <path fill="#f8b26a" d="M50 50L20 50A30 30 0 0 1 80 50Z">
        //                         <animateTransform keyTimes="0;0.5;1" values="0 50 50;-45 50 50;0 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        //                     </path>
        //                 </g><g></g></g>
        //             </svg>
        //         </div>
        //     )}
        //     <div className="dropcontainer w-full max-w-xl bg-white rounded-md shadow-lg overflow-hidden z-10">
        //         {dropdown.length === 0 ? (
        //             <div className="p-4 text-center text-gray-500">No products found.</div>
        //         ) : (
        //             dropdown.map(item => {
        //                 return (
        //                     <div
        //                         key={item.slug}
        //                         className="flex justify-between p-4 my-2 bg-white shadow-md rounded-md border border-gray-200 hover:bg-purple-100 transition duration-200 w-full "
        //                     >
        //                         <span className="slug font-medium text-gray-800">
        //                             {item.slug} ({item.quantity} available for ₹{item.price})
        //                         </span>
        //                         <div className='flex items-center'>
        //                             <button
        //                                 onClick={() => { buttonAction("minus", item.slug, item.quantity) }}
        //                                 disabled={loadingaction}
        //                                 className="subtract inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200 transition duration-200"
        //                             >
        //                                 -
        //                             </button>

        //                             <span className="quantity inline-block min-w-3 mx-3">{item.quantity}</span>
        //                             <button
        //                                 onClick={() => { buttonAction("plus", item.slug, item.quantity) }}
        //                                 disabled={loadingaction}
        //                                 className="add inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200 transition duration-200"
        //                             >
        //                                 +
        //                             </button>
        //                         </div>
        //                     </div>

        //                 );
        //             })
        //         )}
        //     </div>
        // </div>
        <div className="container mx-auto my-8 mt-40 p-8 rounded-md bg-gradient-to-r from-purple-100 to-purple-300 shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Search a Product</h1>
            <div className="flex mb-4">
                <input
                    onChange={onDropdownEdit}
                    type="text"
                    placeholder="Enter a product name"
                    className="flex-1 border-2 border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 shadow-md bg-white text-black"
                />
                <select className="flex-shrink-0 border-2 border-gray-300 px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 shadow-md bg-white text-black">
                    <option value="">All</option>
                    <option value="category1">Price</option>
                    <option value="category2">Quantity</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            {loading && (
                <div className='flex justify-center items-center mb-4'>
                    {/* Loading SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{ shapeRendering: 'auto', display: 'block', borderRadius: '50%' }}>
                        <g>
                            <g>
                                <circle fill="#e15b64" r="4" cy="50" cx="60">
                                    <animate begin="-0.67s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                                    <animate begin="-0.67s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                                </circle>
                                <circle fill="#e15b64" r="4" cy="50" cx="60">
                                    <animate begin="-0.33s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                                    <animate begin="-0.33s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                                </circle>
                                <circle fill="#e15b64" r="4" cy="50" cx="60">
                                    <animate begin="0s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                                    <animate begin="0s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                                </circle>
                            </g>
                            <g transform="translate(-15 0)">
                                <path transform="rotate(90 50 50)" fill="#f8b26a" d="M50 50L20 50A30 30 0 0 0 80 50Z"></path>
                                <path fill="#f8b26a" d="M50 50L20 50A30 30 0 0 0 80 50Z">
                                    <animateTransform keyTimes="0;0.5;1" values="0 50 50;45 50 50;0 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                                </path>
                                <path fill="#f8b26a" d="M50 50L20 50A30 30 0 0 1 80 50Z">
                                    <animateTransform keyTimes="0;0.5;1" values="0 50 50;-45 50 50;0 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            )}
            <div className="dropcontainer w-full max-w-xl bg-white rounded-md shadow-lg overflow-hidden z-10">
                {dropdown.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No products found.</div>
                ) : (
                    dropdown.map(item => {
                        return (
                            <div
                                key={item.slug}
                                className="flex justify-between p-4 my-2 bg-white shadow-md rounded-md border border-gray-200 hover:bg-purple-100 transition duration-200 w-full"
                            >
                                <span className="slug font-medium text-gray-800">
                                    {item.slug} ({item.quantity} available for ₹{item.price})
                                </span>
                                <div className='flex items-center'>
                                    <button
                                        onClick={() => { buttonAction("minus", item.slug, item.quantity) }}
                                        disabled={loadingaction}
                                        className="subtract inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200 transition duration-200"
                                    >
                                        -
                                    </button>

                                    <span className="quantity inline-block min-w-3 mx-3">{item.quantity}</span>
                                    <button
                                        onClick={() => { buttonAction("plus", item.slug, item.quantity) }}
                                        disabled={loadingaction}
                                        className="add inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200 transition duration-200"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default page
