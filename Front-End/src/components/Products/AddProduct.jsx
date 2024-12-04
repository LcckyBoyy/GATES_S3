import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';

function AddProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      console.log('Product Data:', productData);
      // Example API call
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(productData)
      // });
      
      // If successful, navigate back to products list
      navigate('/tes/inventory/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center mb-6">
        
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {productData.image && (
                <img 
                  src={productData.image} 
                  alt="Product Preview" 
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/tes/inventory/products')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600"
          >
            <FiSave className="mr-2" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;