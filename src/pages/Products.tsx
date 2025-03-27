import React, { useEffect, useState } from 'react'
import { getProducts, addProduct, deleteProduct } from '../api'

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    amount: 0,
    price: 0,
    serial_number: ''
  })

  const token = getAuthToken()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(token || '')
        if (response.success && response.products) {
          setProducts(response.products)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [token])

  const handleAddProduct = async () => {
    try {
      await addProduct(token || '', newProduct)
      const response = await getProducts(token || '')
      if (response.success && response.products) {
        setProducts(response.products)
        setNewProduct({
          product_name: '',
          amount: 0,
          price: 0,
          serial_number: ''
        })
      }
    } catch (error) {
      console.error('Failed to add product:', error)
    }
  }

  const handleDeleteProduct = async (productName: string) => {
    try {
      await deleteProduct(token || '', productName)
      const response = await getProducts(token || '')
      if (response.success && response.products) {
        setProducts(response.products)
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  if (loading) return <div>Loading products...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({...newProduct, product_name: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newProduct.amount}
            onChange={(e) => setNewProduct({...newProduct, amount: parseInt(e.target.value) || 0})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Serial Number"
            value={newProduct.serial_number}
            onChange={(e) => setNewProduct({...newProduct, serial_number: e.target.value})}
            className="p-2 border rounded"
          />
        </div>
        <button 
          onClick={handleAddProduct}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.serial_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleDeleteProduct(product.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
