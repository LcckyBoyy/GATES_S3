import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 999.99,
      stock: 50,
      sku: "ELEC-001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ut? Explicabo voluptatum necessitatibus rerum quasi perspiciatis.",
      image: "/api/placeholder/50/50", // Placeholder image
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 49.99,
      stock: 100,
      sku: "ELEC-002",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ut? Explicabo voluptatum necessitatibus rerum quasi perspiciatis.",
      image: "/api/placeholder/50/50", // Placeholder image
    },
    {
      id: 3,
      name: "Ergonomic Chair",
      category: "Office Furniture",
      price: 299.99,
      stock: 25,
      sku: "FURN-001",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ut? Explicabo voluptatum necessitatibus rerum quasi perspiciatis.",
      image: "/api/placeholder/50/50", // Placeholder image
    },
  ]);

  // Function to truncate description
  const truncateDescription = (description, maxLength = 50) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
      {/* Table Header with Add Product Button */}
      <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
        <h2 className="text-xl font-bold">Product Management</h2>
        <button
          onClick={() => navigate("/tes/inventory/products/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <table className="w-full">
        <thead className="bg-white border-b-[1px]">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}  className="border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/tes/inventory/products/${product.id}`)}>
              
              <td className="p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">${product.price.toFixed(2)}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">{product.sku}</td>
              <td className="p-3" title={product.description}>
                {truncateDescription(product.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
