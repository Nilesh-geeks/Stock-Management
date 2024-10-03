
"use client"
import React, { useState, useEffect } from 'react';

const Prod = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const rjson = await response.json();
                setProducts(rjson.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    return (
        <div className="container  mx-auto text-black px-4 my-32">
            <h1 className="text-5xl font-bold mb-6 text-center">Current Stock</h1>
            <div className="overflow-x-auto bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg shadow-lg">
                <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600">
                            <th className="px-4 py-2 border-b-2 border-gray-500">Product Name</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Quantity</th>
                            <th className="px-4 py-2 border-b-2 border-gray-500">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.slug} className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="border-b border-gray-300 px-4 py-2">{product.slug}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{product.quantity}</td>
                                <td className="border-b border-gray-300 px-4 py-2">₹{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prod;


