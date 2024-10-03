"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'


export default function Home() {
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


  const buttonAction = async (action, slug, initialQuantity) => {
    // Immediately change the quantity of the product with given slug in Products
    let index = products.findIndex((item) => item.slug == slug)
    let newProducts = JSON.parse(JSON.stringify(products))
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

  const addProduct = async (e) => {
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        // Product added successfully
        setAlert("Your Product has been added!")
        setProductForm({})
      } else {
        // Handle error case
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // Fetch all the products again to sync back
    const response = await fetch('/api/product')
    let rjson = await response.json()
    setProducts(rjson.products)
    e.preventDefault();
  }

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const onDropdownEdit = async (e) => {
    let value = e.target.value
    setQuery(value)
    if (value.length > 3) {
      setLoading(true)
      setDropdown([])
      const response = await fetch('/api/search?query=' + query)
      let rjson = await response.json()
      setDropdown(rjson.products)
      setLoading(false)
    }
    else {
      setDropdown([])
    }
  }

  return (
    <>
      <div className="container mx-auto my-8 mt-40 p-8 rounded-md bg-gradient-to-r from-purple-100 to-purple-300 shadow-lg">
        <div className='text-green-800 text-center'>{alert}</div>
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

      {/* Display Current Stock  */}
      {/* <div className="container mx-auto my-12 text-black">
        <h1 className="text-5xl font-bold mb-6 text-center">Add a Product</h1>

        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">Product Title</label>
            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" id="productName" className="w-full border border-gray-300 px-4 py-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" id="quantity" className="w-full border border-gray-300 px-4 py-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Price</label>
            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="number" id="price" className="w-full border border-gray-300 px-4 py-2" />
          </div>

          <button onClick={addProduct} type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold">
            Add Product
          </button>


        </form>
      </div> */}

      <div className="container mx-auto my-12 p-6 bg-gradient-to-r from-purple-100 to-purple-300 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Add a Product</h1>

        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload on form submission
          addProduct();
        }}>
          <div className="mb-5">
            <label htmlFor="productName" className="block mb-2 text-lg font-medium text-gray-700">Product Title</label>
            <input
              value={productForm?.slug || ""}
              name='slug'
              onChange={handleChange}
              type="text"
              id="productName"
              className="w-full border-2 border-gray-400 px-4 py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 shadow-sm"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="quantity" className="block mb-2 text-lg font-medium text-gray-700">Quantity</label>
            <input
              value={productForm?.quantity || ""}
              name='quantity'
              onChange={handleChange}
              type="number"
              id="quantity"
              className="w-full border-2 border-gray-400 px-4 py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 shadow-sm"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-lg font-medium text-gray-700">Price</label>
            <input
              value={productForm?.price || ""}
              name='price'
              onChange={handleChange}
              type="number"
              id="price"
              className="w-full border-2 border-gray-400 px-4 py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg shadow-md font-semibold transition duration-200 transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>


      <div className="container my-10 mx-auto text-black px-4">
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
    </>
  )
}